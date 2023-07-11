const Country = ({ c, showInfo }) => {

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
const Language = ({lang}) => <li>{lang}</li>

const Results = ({countries, filter, showInfo}) => {
  
  const c = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (c.length > 10) return "Too many matches, specify another filter";

  if (c.length > 1)
    return (
      <ul>
        {c.map(c =>
          <Country
            key={c.name.common}
            c={c}
            showInfo={showInfo}/>)}
      </ul>
    )

  if (c.length === 1) {

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
      </>
    )
  }

  return null
}

export default Results
