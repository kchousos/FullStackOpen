import { useState } from 'react';

const Person = ({ name, number }) => <li>{ name }: { number }</li>;

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    if (!persons.filter(p => p.name === newName).length)
      setPersons(persons.concat(newPerson));
    else
      alert(`${newName} is already added to phonebook`);
    setNewName('');
    setNewNumber('');
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
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
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>

      <ul>
        {persons.map(p => <Person key={p.name} name={p.name} number={p.number}/>)}
      </ul>
    </>
  );
};

export default App;
