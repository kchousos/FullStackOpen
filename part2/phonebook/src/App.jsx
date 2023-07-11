import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  },[]);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    if (!persons.filter(p => p.name === newName).length) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
    else
      alert(`${newName} is already added to phonebook`);
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
