import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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

      <Filter
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}/>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons displayPerson={displayPerson}/>
    </>
  );
};

export default App;
