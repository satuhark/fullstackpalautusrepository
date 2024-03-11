import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const BlogComponent = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    
    useEffect(() => {
        axios.get(baseUrl)
          .then((response) => {
            setBlogs(response.data)
          })
          .catch((error) => {
            console.error('Error fetching blogs:', error.message)
          })
      }, [])
    
    const deleteBlog = (id) => {
        const deletedBlog = blogs.find((blog) => blog.id === id)
        axios
        .delete(`${baseUrl}/${deletedBlog.id}`)
        .then(() => {
            setBlogs(blogs.filter((blog) => blog.id !== id))
        })
        .catch(() => {
        setErrorMessage(`didnt manage to delete ${deletedBlog.title}`)
    })
}

const likeBlog = (id) => {
    axios
    .put(`${baseUrl}/${id}`)
    .then(() => {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
            blog.id === id ? { ...blog, likes: blog.likes + 1, liked: true } : blog
          )
        )
      })
      .catch((error) => {
        setErrorMessage('Blog post was not liked')
        console.error('Error liking blog:', error.message)
      })}

      
      
      return (
        <div>
          {blogs.map((blog) => (
            <div key={blog.id}>
              Author: {blog.author} <br />
              Title: {blog.title} <br />
              URL: {blog.url} <br />
              Likes: {blog.liked ? blog.likes + 1 : blog.likes}{' '}
              Added by: {blog.user ? blog.user.username : 'Unknown'} <br />
              <button onClick={() => likeBlog(blog.id)} type="button">Like</button>
              <button onClick={() => deleteBlog(blog.id)}>Delete</button>
            </div>
          ))}
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      )
    }

    export default BlogComponent