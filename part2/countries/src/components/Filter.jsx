const Filter = ({newSearch, handleSearchChange}) => {

  return (
    <>
      Search countries:
      <input type="search"
             value={newSearch}
             onChange={handleSearchChange}>
      </input>
    </>
  );
};

export default Filter;
