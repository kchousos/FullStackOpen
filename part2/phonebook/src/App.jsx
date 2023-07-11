import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(false);

  const refreshPhonebook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }

  useEffect(refreshPhonebook,[]);

  const personAddedNotification = (name) => {
    setNotificationMessage(
      `Added ${name}`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    if (!persons.filter(p => p.name === newName).length) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
      personAddedNotification(newName)
    }
    else {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(persons.filter(p => p.name === newName)[0].id, newPerson)
          .catch(() => {
            setNotificationStatus(true)
            setNotificationMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationStatus(false)
            }, 5000)
          })
        refreshPhonebook()
      }
      setNewName('');
      setNewNumber('');
    }
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


  const deletePerson = id => {
    if (window.confirm(`Delete ${persons.filter(p => p.id === id)[0].name}?`)) {
      personService
        .axdelete(id)
      refreshPhonebook()
    }
  }

  return (
    <>
      <h2>Phonebook</h2>

      <Notification
        message={notificationMessage}
        notificationStatus={notificationStatus} />

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

      <Persons
        displayPerson={displayPerson}
        deletePerson={deletePerson}/>
    </>
  );
};

export default App;
