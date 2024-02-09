import React, { useState } from 'react'
import axios from 'axios'


const baseUrl = 'http://localhost:3001/api/persons'

const AddPerson = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
        setErrorMessage(`${newName} is already added to the phonebook.`)
        setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          return
    }

    else 
    {
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          
    const personObject = {
      name: newName,
      phone: newPhone,
    }
  
    axios.post((`${baseUrl}`), personObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('')
      setNewPhone('')
    })

}
  return
  
}
  return (
    <div>
      <h2>add a new</h2>
      {errorMessage && <div className="error2">{errorMessage}</div>}
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson