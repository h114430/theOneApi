import { ICharacter, nameOptions } from "../App"
import ReactTooltip from 'react-tooltip'
import Multiselect from 'multiselect-react-dropdown'

interface race {
  name: string
}
//had to make manually instead of mapping race due to API's naming of certain races.
const raceOptions: Array<race> = [
  {name: 'Ainur'},
  {name: 'Dragons'},
  {name: 'Elf'},
  {name: 'Ents'},
  {name: 'Dwarf'},
  {name: 'Great Eagles'},
  {name: 'God'},
  {name: 'Half-elven'},
  {name: 'Hobbit'},
  {name: 'Human'},
  {name: 'Maiar'},
  {name: 'Orc'},
  {name: 'Uruk-hai'},
  {name: 'Werewolves'}
]

interface IOwnProps{
    characters: Array<ICharacter>
    handleNameOptionChange: (event: { target: { value: React.SetStateAction<string> } }) => void
    selectName: string
    races: string[]
    setRaces: (current:any) => void
}

const Table = ({ characters, selectName, races,handleNameOptionChange, setRaces }: IOwnProps) => {

  const onSelect = ((_: any, data: race) => {
      if(!races.includes(data.name)){
        setRaces([... races, data.name])
      }
      else{
        setRaces((current: Array<string>) => current.filter(element => {
          return element !== data.name
        }),)
        }
      }
    )

    return (
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Race</th>
            <th>Gender</th>
            <th>wikiUrl</th>
            <th>Birth</th>
          </tr>
            <tr>
              <td>
                 <select value={selectName} onChange={handleNameOptionChange} >
                   {nameOptions.map(nameOptions => (
                  <option key={nameOptions.value} value={nameOptions.value}>
                   {nameOptions.text}
                  </option>
                   ))}
                 </select>
              </td>
              <td>
            
                <Multiselect
                  options={raceOptions}
                  onSelect={onSelect}
                  onRemove={onSelect}
                  displayValue='name'
                  placeholder='Choose filter'
                  showCheckbox
                  style={{
                    multiselectContainer: {
                      color: 'brown'
                    }
                  }}
                  />
              </td>
            </tr>
            
        </thead>
        <tbody>
          {characters.map((data) => data.name !== "MINOR_CHARACTER" ? (
            <tr key={data._id}>
              <td>{data.name}</td>
              <td>{data.race}</td>
              <td>{data.gender}</td>
              <td>{data.wikiUrl ? <a href={data.wikiUrl}>Learn more about {data.name} at LoTR Wiki</a> : 'No wiki page available for '+ data.name} </td>
              <td data-tip data-for={data._id}>
              <ReactTooltip id={data._id}>
              {data.death !== "" && data.death !== "NaN" ? <div>Death: {data.death}</div> : <span>No death information available</span>}
              </ReactTooltip>{data.birth}</td>
            </tr>

          ): null)}
        </tbody>
      </table>
    )
}

export default Table