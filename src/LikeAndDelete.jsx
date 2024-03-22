import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [viewVisible, setViewVisible] = useState(null)

  const handleViewVisible = (id) => {
    setViewVisible(id === viewVisible ? null : id)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setBlogs(response.data)
      } catch (error) {
        console.error('Error fetching blogs:', error.message)
      }
    }
    fetchData()
  }, [])

  const deleteBlog = async (id) => {
    const deletedBlog = blogs.find((blog) => blog.id === id)

    try {
      await axios.delete(`${baseUrl}/${deletedBlog.id}`)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      setErrorMessage(`Didn't manage to delete ${deletedBlog.title}`)
    }
  }

  const confirmDeleteBlog = (blog) => {
    const shouldDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (shouldDelete) {
      deleteBlog(blog.id)
    }
  }

  const likeBlog = async (id) => {
    try {
      await axios.put(`${baseUrl}/${id}`)
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blog.likes + 1, liked: true } : blog
        )
      )
    } catch (error) {
      setErrorMessage('Blog post was not liked')
      console.error('Error liking blog:', error.message)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      {sortedBlogs.map((blog) => (
        <div key={blog.id} data-testid={`blog-${blog.id}`}>
          <p>Author: {blog.author}</p>
          <button onClick={() => handleViewVisible(blog.id)}>
            {viewVisible === blog.id ? 'Hide' : 'View'}
          </button>
          {viewVisible === blog.id && (
            <div>
                Title: {blog.title} <br />
                URL: {blog.url} <br />
                Likes: {blog.liked ? blog.likes + 1 : blog.likes}{' '}
                Added by: {blog.user ? blog.user.username : 'Unknown'} <br />
              <button onClick={() => likeBlog(blog.id)} type="button">Like</button>
              {blog.user.id && (
                <button onClick={() => confirmDeleteBlog(blog)}>Delete</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default BlogComponent