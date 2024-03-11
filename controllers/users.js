const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs')

  response.send(JSON.stringify(users, 2))
})

usersRouter.post('/', async (request, response) => {
    try {
      const { username, name, password } = request.body
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
    
      const user = new User({
        username,
        name,
        passwordHash,
      })
    
      const savedUser = await user.save()
    
      response.status(201).json(savedUser)
    } catch (error) {
      console.error('Error creating user:', error.message)
      response.status(500).json({ error: 'User creation failed' })
    }
  })

module.exports = usersRouter