import { useState, useEffect } from 'react'
import axios from 'axios'

const userUrl = 'http://localhost:3003/api/users'

const NewUser = () => {
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        axios.get(userUrl)
          .then((response) => {
            const user = response.data[0]
            setUser(user)
          })
          .catch((error) => {
            console.error('Error fetching user:', error.message)
          })
      }, [])

      const handleUsernameChange = (event) => {
        setNewUsername(event.target.value)
      }
      const handlePasswordChange = (event) => {
        setNewPassword(event.target.value)
      }
      const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
    const createUser = (event) => {
        event.preventDefault()
        
        const userObject = {
            username: newUsername,
            password: newPassword,
            name: newName,
        }

    axios.post(userUrl, userObject)
      .then((response) => {
        console.log('User created:', response.data)
        setNewUsername('')
        setNewPassword('')
        setNewName('')
      })
      .catch((error) => {
        console.error('User creation failed:', error.response?.data || error.message)
        setErrorMessage('User creation failed')
        setNewUsername('')
        setNewPassword('')
        setNewName('')
      })
  }

  return (
  <div>
    <h2>Create a new user</h2>
    <form onSubmit={(event) => createUser(event)}>
        <div>
            New User: <input value={newUsername} onChange={handleUsernameChange} autoComplete="username" />
            New Password: <input type="password" value={newPassword} onChange={handlePasswordChange} autoComplete="current-password" />
            Name: <input value={newName} onChange={handleNameChange} />
        </div>
            <button type="submit">Create User</button>
    </form>
    </div>
    )
}

export default NewUser