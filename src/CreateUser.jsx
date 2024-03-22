import './index.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3003/api'

const NewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessage2, setErrorMessage2] = useState('')

  useEffect(() => {
    axios.get('/users')
      .then((response) => {
        console.log('User data:', response.data)
      })
      .catch((error) => {
        console.error('Error fetching user:', error.message)
      })
  }, [])

  const createUser = (event) => {
    event.preventDefault()
    const userObject = {
      username: username,
      password: password,
      name: name,
    }

    axios.post('/users', userObject)
      .then((response) => {
        console.log('User created:', response.data)
        setErrorMessage2(`User ${userObject.username} created`)
        setUsername('')
        setPassword('')
        setName('')
      })
      .catch((error) => {
        console.error('failed user creation:', error.response?.data || error.message)
        setErrorMessage('failed user creation ')
        setUsername('')
        setPassword('')
        setName('')
      })
    setTimeout(() => {
      setErrorMessage('')
      setErrorMessage2('')
    }, 5000)
  }

  return (
    <div>
      <h2>Create a new user</h2>
      <form onSubmit={createUser}>
        <div>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {errorMessage2 && <div className="success">{errorMessage2}</div>}
        </div>
        <div>
            New User: <input value={username} onChange={({ target }) => setUsername(target.value)} autoComplete="username" />
            New Password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="current-password" />
            Name: <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  )
}

export default NewUser