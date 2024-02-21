import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const baseUrl = 'http://localhost:3001/api/persons'

const AddPerson = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessage2, setErrorMessage2] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
          
    const personObject = {
      name: newName,
      number: newPhone,
    }
  
    axios
    .post(baseUrl, personObject)
    .then((response) => {
      if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
        setErrorMessage(`${newName} is already added to the phonebook.`)
        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
        return
        
        } else {
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        }
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewPhone('')
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        const errorMessage2 = error.response.data.error
        setErrorMessage2(errorMessage2)
      } else {
        console.error('Error adding person:', error)
        setErrorMessage2('Failed to add person. Please try again.')
      }
      setTimeout(() => {
        setErrorMessage2('')
      }, 5000)
    })
  
}

  return (
    <div>
      <h2>add a new</h2>
      {errorMessage && <div className="error2">{errorMessage}</div>}
      {errorMessage2 && <div className="error">{errorMessage2}</div>}
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

AddPerson.propTypes = {
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired
}

export default AddPerson