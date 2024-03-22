import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogComponent from './LikeAndDelete'
import NewUser from './CreateUser'
import loginService from './services/login'
import AddBlog from './AddBlog'

axios.defaults.baseURL = 'http://localhost:3003/api'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/blogs')
        setBlogs(response.data)
      } catch (error) {
        console.error('Error fetching blogs:', error.message)
        setErrorMessage('Failed to fetch blogs')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }}

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username: <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} autoComplete="username" />
        Password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="current-password" />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>Log out</button>
  )

  return (
    <div>
      <h2>log in to application</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {!user && loginForm()}
      {!user && <NewUser/>}
      {user && (
        <div>
          <p>{user.username} logged in</p>
          {logoutButton()}
          <AddBlog setBlogs={setBlogs} />
          <BlogComponent blogs={blogs} setBlogs={setBlogs}/>
        </div>
      )}
    </div>
  )
}

export default Blog