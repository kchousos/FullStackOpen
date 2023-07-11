import axios from "axios"
import { useState, useEffect } from "react"
const apiKey = import.meta.env.VITE_API_KEY

const Language = ({lang}) => <li>{lang}</li>

const CountryLi = ({ c, showInfo }) => {

  console.log('in country', c.name.common)
  return (
    <>
      <li>
        {c.name.common}
        <button style={{margin: 5}}
                onClick={() => showInfo(c.name.common)}>Show</button>
      </li>
    </>
  )
}

const Country = ({ c, filter }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${c[0].capitalInfo.latlng[0]}&lon=${c[0].capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`
    axios.get(apiCall)
      .then(response => setWeather(response.data))
  }, [c.capital])

  const langs = Array.isArray(c[0].languages)
        ? c[0].languages
        : Object.values(c[0].languages)

  return (
    <>
      <h2>{c[0].name.common}</h2>
      <p>Capital: {c[0].capital}</p>
      <p>Area: {c[0].area}</p>
      <h3>Languages</h3>
      <ul>
        {langs.map(l =>
          <Language key={l} lang={l}/>)}
      </ul>
      <img src={c[0].flags.png} height={100}/>
      <Weather w={weather} />
    </>
  )
}

const Weather = ({ w }) => {
  return (
    <>
      {!w ? (
        <p>...</p>
      ) : (
        <>
          <h3>Weather in {w.name}</h3>
          <p>
            Temperature: {w.main.temp} ℃
            <br/>
        <img src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}/>
          </p>
          <p>Wind: {w.wind.speed} m/s</p>
        </>
      )}
    </>
  )
}

const Results = ({countries, filter, showInfo}) => {
  
  const c = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (c.length > 10) return "Too many matches, specify another filter";

  if (c.length > 1)
    return (
      <ul>
        {c.map(c =>
          <CountryLi
            key={c.name.common}
            c={c}
            showInfo={showInfo}/>)}
      </ul>
    )

  if (c.length === 1) return <Country c={c} filter={filter}/>

  return null
}

export default Results
