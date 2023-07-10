import { useState } from 'react';

const Person = ({ name, number }) => <li>{ name }: { number }</li>;

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

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

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };
  const displayPerson = newSearch
  ? persons.filter(person => person.name.toLowerCase().search(newSearch.toLowerCase()) !== -1)
  : persons;

  return (
    <>
      <h2>Phonebook</h2>
      <h3>Search</h3>
      Filter:
      <input type="search"
             value={newSearch}
             onChange={handleSearchChange}>
      
      </input>
      <br/>
      <br/>
      <h3>Add Contact</h3>
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
       {displayPerson.map(p => <Person key={p.id} name={p.name} number={p.number}/>)}
      </ul>
    </>
  );
};

export default App;
