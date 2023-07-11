const Filter = ({newSearch, handleSearchChange}) => {

  return (
    <>
      Search countries:
      <input style={{margin: 10}}
        type="search"
        value={newSearch}
        onChange={handleSearchChange}>
      </input>
    </>
  );
};

export default Filter;
