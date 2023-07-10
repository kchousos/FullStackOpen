const Filter = ({newSearch, handleSearchChange}) => {

  return (
    <>
      <h3>Search</h3>
      Filter:
      <input type="search"
             value={newSearch}
             onChange={handleSearchChange}>
        
      </input>
    </>
  );
};

export default Filter;
