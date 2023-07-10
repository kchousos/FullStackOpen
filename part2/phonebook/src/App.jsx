import { useState } from 'react';

const Person = ({ name }) => <li>{ name }</li>;

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName };
    if (!persons.filter(p => p.name === newName).length)
      setPersons(persons.concat(newPerson));
    else
      alert(`${newName} is already added to phonebook`);
    setNewName('');
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
                  value={newName}
                onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map(p => <Person key={p.name} name={p.name}/>)}
      </ul>
    </>
  );
};

export default App;
