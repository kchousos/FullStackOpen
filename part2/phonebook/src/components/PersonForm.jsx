const PersonForm = (props) => {
  return (
    <>
      <h3>Add Contact</h3>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input
                  value={props.newName}
                  onChange={props.handlePersonChange}/>
        </div>
        <div>
          number: <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
