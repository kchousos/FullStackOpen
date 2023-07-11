const CountryIl = ({name}) => <li>{name}</li>
const Language = ({lang}) => <li>{lang}</li>

const Results = ({countries, filter}) => {
  
  const c = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (c.length > 10) return "Too many matches, specify another filter";

  if (c.length > 1)
    return (
      <ul>
        {c.map(c =>
          <CountryIl
            key={c.name.common}
            name={c.name.common}/>)}
      </ul>
    )

  if (c.length === 1) {

    const langs = Array.isArray(c[0].languages)
          ? c[0].languages
          : Object.values(c[0].languages)

    return (
      <>
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
