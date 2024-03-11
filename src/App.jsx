import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogComponent from './LikeAndDelete'
import NewUser from './CreateUser'
import Login from './Login'

const baseUrl = 'http://localhost:3003/api/blogs'

const AddBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    axios.get(baseUrl)
      .then((response) => {
        console.log('Response data:', response.data)
        setBlogs(response.data)
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error.message)
      })
  }, [])

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: 0,
    }

    axios.post(baseUrl, blogObject)
      .then((response) => {
        setBlogs((prevBlogs) => prevBlogs.concat({ ...response.data, liked: false }))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      })
      .catch(() => {
        setErrorMessage('Blog post was not added')
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      })
  }
      
      return (
      <div>
        <h2>Add a new blog</h2>
        <form onSubmit={(event) => addBlog(event)}>
        <div>
          Author: <input value={newAuthor} onChange={handleAuthorChange} />
          Title: <input value={newTitle} onChange={handleTitleChange} />
          Url: <input value={newUrl} onChange={handleUrlChange} />
          <button type="submit">Add</button>
        </div>
      </form>
      {errorMessage}
      <Login/>
      <NewUser/>
      <BlogComponent blogs={blogs} setBlogs={setBlogs}/>
    </div>
  )
}

export default AddBlog