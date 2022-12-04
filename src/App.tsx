import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import ItemsPerPage from './components/ItemsPerPage'
import Table from './components/Table'

export interface ICharacter {
  _id: string
 name: string
 race: string
 gender: string
 wikiUrl: string
 birth: string
 death: string
}

export const nameOptions = [
  {value: 'asc', text: 'Ascending'},
  {value: 'desc', text: 'Descending'}
]

export function App() {

  const [characters, setCharacters] = useState([] as Array<ICharacter>)
  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const [selectName, setSelectName] = useState(nameOptions[0].value)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [races, setRaces] = useState([] as Array<string>)

  const fetchCharacters = async () => {
    axios.get(`https://the-one-api.dev/v2/character?limit=${limit}&page=${page}&sort=name:${selectName}&race=` + races.map((r) => r + ","), {
    headers: {
      'Authorization': `Bearer tvbkEAHwhk1NR5O4UMWU`
    }
  })
  .then(res => {
        setCharacters(res.data.docs)
        setTotalPage(Math.ceil(res.data.total/limit))
        }).catch(err => {
          console.log(err)
      })
  }

  const handleNameOptionChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectName(event.target.value)
  }

  const handlePageClick = (data: any) => {
    setPage(data.selected + 1)
  }

  useEffect(() => {
    fetchCharacters()
  },[page,races,limit,selectName])

  return (

  <div>
    <Table
    characters={characters}
    handleNameOptionChange={handleNameOptionChange}
    selectName={selectName}
    races={races}
    setRaces={setRaces}
    />
    <br></br>
    <div>
        <div>Characters per page  <ItemsPerPage setLimit={setLimit} /></div>
    </div>
    <ReactPaginate
        previousLabel ={'previous'}
        nextLabel={'next'}
        breakLabel={'.....'}
        pageCount={totalPage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        />

  </div>

    )
}

export default App