const mongoose = require('mongoose')
const User = require('./user')

const blogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    url: String,
    likes: Number,
    liked: Boolean,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      User.populate(document, 'user')
      const user = document.user
      const userId = user?. _id?.toString()
      const username = user?.username
      const name = user?.name

      returnedObject.user = {
          id: userId,
          username,
          name
      }
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.liked
    }
  })

  module.exports = mongoose.model('Blog', blogSchema)