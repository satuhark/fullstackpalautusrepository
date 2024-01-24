import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import AddPerson from './Addperson'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    axios.delete(`http://localhost:3001/persons/${id}`).then(() => {
      setPersons(persons.filter((person) => person.id !== id))
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
      <Filter value={newFilter} onChange={handleFilterChange} />
      <AddPerson persons={persons} setPersons={setPersons} />
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
