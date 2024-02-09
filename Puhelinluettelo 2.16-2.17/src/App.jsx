import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import AddPerson from './Addperson'

const baseUrl = 'http://localhost:3001/api/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    axios.get(`${baseUrl}`)
    .then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    const deletedPerson = persons.find((person) => person.id === id)

    axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      setPersons(persons.filter((person) => person.id !== id))
      setErrorMessage(`Deleted ${deletedPerson.name}`)
        setTimeout(() => {
            setErrorMessage('')
          }, 5000)
    })
    .catch(error => {
      setErrorMessage(`Information of '${deletedPerson.name}' has already been removed from server`)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    })
  }

  const filteredPersons = persons.filter(({ name }) =>
  name.toLowerCase().includes(newFilter.toLowerCase()))

  const confirmDeletePerson = (id, name) => {
    const shouldDelete = window.confirm(`Delete ${name}?`)
  
    if (shouldDelete) {
      deletePerson(id)
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter value={newFilter} onChange={handleFilterChange} />
      <AddPerson addPerson={setErrorMessage} persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {filteredPersons.map(({name, phone, id}, index) => (
        <div key={index}>
          {name} {phone}
          <button onClick={() => confirmDeletePerson(id, name)}>Delete</button>
        </div>
        ))}
    </div>
  )
}

export default App