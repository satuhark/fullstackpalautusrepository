const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error.message)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

usersRouter.post('/', async (request, response) => {
    try {
      const { username, name, password } = request.body
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
    
      const user = new User({
        username,
        passwordHash,
        name,
      })
    
      const savedUser = await user.save()
    
      response.status(201).json(savedUser)
    } catch (error) {
      console.error('Error creating user:', error.message)
      response.status(500).json({ error: 'User creation failed' })
    }
  })

module.exports = usersRouter