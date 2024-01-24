import React, { useState } from 'react'
import axios from 'axios'

const AddPerson = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`)
      return
    }

    const personObject = {
      name: newName,
      phone: newPhone,
    }

    axios.post('http://localhost:3001/persons', personObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('')
      setNewPhone('')
    })
  }

  return (
    <div>
      <h2>add a new</h2>
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
  );
};

export default AddPerson
