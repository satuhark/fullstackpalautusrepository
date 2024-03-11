const mongoose = require('mongoose')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }})
  
  blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({})
    
    const blog = new Blog({
      _id: new mongoose.Types.ObjectId(),
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      liked: request.body.liked || false,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    console.log('Saved blog:', savedBlog)
    response.status(201).json(savedBlog)
  })
  
  blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })

blogRouter.delete('/:id', async (req, res) => {
  const result = await Blog.deleteOne({ _id: req.params.id })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.status(204).end()
})


  module.exports = blogRouter