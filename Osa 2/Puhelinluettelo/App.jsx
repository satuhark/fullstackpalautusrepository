import { useState } from 'react'
import Filter from './Filter'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)}

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)}
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
      return
    }
    setPersons([...persons, { name: newName, phone: newPhone }])
    setNewName('')
    setNewPhone('')}
  
  const filteredPersons = persons.filter(({ name }) =>
  name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <Persons
        newName={newName}
        newPhone={newPhone}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      {filteredPersons.map(({name, phone}, index) => (
        <div key={index}>
          {name} {phone}
        </div>
        ))}
    </div>
  )
}

export default App
