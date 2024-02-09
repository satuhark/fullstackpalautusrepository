import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => (
<input value={value} onChange={onChange} />
)

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then((response) => {
      setCountries(response.data)
    })
    .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setSelectedCountry(null)
  }

  const Details = ({ name, capital, area, languages, flags }) => {
    const languageNames = Object.values(languages)
   
    return (
    <div key={name.common}>
      <h2>{name.common}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <br />
      <div>
        <b>Languages:</b>
        <ul>
        {languageNames.map((language, index) => (
        <li key={index}>{language}</li>
        ))}</ul>
      </div>
      <img src={flags.png} alt={`${name.common} flag`} />
    </div>
    )
  }

  const showDetails = (countryName) => {
    const country = filteredCountries.find(
      (country) => country.name.common === countryName
    )

    if (country) {
      setSelectedCountry(country)
    }
  }

  const showCountries = () => (
    <div>
    {filteredCountries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : filteredCountries.length === 1 ? (
      <Details{...filteredCountries[0]} />
     ) : ( 
    <div>
      {filteredCountries.map(({ name }) => (
        <div key={name.common}>
          {name.common}
          <button onClick={() => showDetails(name.common )}>show</button>
        </div>
        ))}
        </div>
      )}
    </div> 
  )

  const filteredCountries = countries.filter(({ name }) =>
  name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  
  return (
    <div>
      <p>
        find countries 
        <Filter value={newFilter} onChange={handleFilterChange} />
      </p>
      {showCountries()}
    </div>
    )
}
  
export default App