interface IOwnProps {
    setLimit: (number: number) => void
  }
  
  const ItemsPerPage = ({ setLimit }: IOwnProps) => {
    return (
      <div>
        <select
          onChange={(e) =>
            Number(e.target.value) > 0
              ? setLimit(Number(e.target.value))
              : null
          }
        >
          <option>15</option>
          <option>30</option>
          <option>50</option>
          <option>100</option>
        </select>
        &emsp;
      </div>
    )
  }
  
  export default ItemsPerPage