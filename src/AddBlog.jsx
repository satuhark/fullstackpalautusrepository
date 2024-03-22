import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const AddBlog = ({ setBlogs }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [addVisible, setAddVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessage2, setErrorMessage2] = useState('')

  const handleAddVisible = () => {
    setAddVisible(true)
  }

  const handleCancel = () => {
    setAddVisible(false)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: author,
      title: title,
      url: url,
      likes: 0,
    }

    try {
      const response = await axios.post(('/blogs'), blogObject)
      setBlogs((prevBlogs) => prevBlogs.concat({ ...response.data, liked: false }))
      setErrorMessage2(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setAuthor('')
      setTitle('')
      setUrl('')
      setAddVisible(false)
    } catch (error) {
      setErrorMessage('Blog post was not added')
      setAuthor('')
      setTitle('')
      setUrl('')
    }
    setTimeout(() => {
      setErrorMessage2('')
      setErrorMessage('')
    }, 5000)
  }

  const blogForm = () => (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {errorMessage2 && <div className="success">{errorMessage2}</div>}
      <button onClick={handleAddVisible}>New Note</button>
      {addVisible && (
        <form onSubmit={addBlog}>
          Author: <input value={author} onChange={({ target }) => setAuthor(target.value)} required/>
          Title: <input value={title} onChange={({ target }) => setTitle(target.value)} required />
          Url: <input value={url} onChange={({ target }) => setUrl(target.value)} required />
          <button type="submit">Add</button>
          <button onClick={handleCancel}>Cancel</button><br/>
        </form>
      )}
    </div>
  )
  return blogForm()
}
AddBlog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
}

export default AddBlog