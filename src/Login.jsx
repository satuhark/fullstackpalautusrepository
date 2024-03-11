import { useState } from 'react'
import axios from 'axios'

const loginUrl = 'http://localhost:3003/api/login'

const Login = () => {
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
  
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const loggingIn = (event) => {
    event.preventDefault()
    
    const userObject = {
        username: newUsername,
        password: newPassword,
    }

    axios.post(loginUrl, userObject)
      .then((response) => {
        console.log('login succesful:', response.data)
        setNewUsername('')
        setNewPassword('')
      })
      .catch((error) => {
        console.error('User creation failed:', error.response?.data || error.message)
        setErrorMessage('Login failed')
        setNewUsername('')
        setNewPassword('')
      })
    }
  

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={(event) => loggingIn(event)}>
          <div>
              Username: <input value={newUsername} onChange={handleUsernameChange} autoComplete="username" />
              Password: <input type="password" value={newPassword} onChange={handlePasswordChange} autoComplete="current-password" />
          </div>
              <button type="submit">Log In</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      </div>
      )

}

export default Login