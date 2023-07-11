import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Results from './components/Results'

const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all/'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios.get(allUrl)
      .then(response => {setCountries(response.data)})
      .catch(error => console.log(error))
  }, [])

  const handleSearchChange = e => setNewSearch(e.target.value)

  return (
    <>
      <h1>Country Information</h1>

      <Filter
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}/>

      <h3>Results</h3>

      <Results countries={countries} filter={newSearch}/>
    </>
  )
}

export default App
