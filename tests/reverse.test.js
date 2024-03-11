const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })
const mongoose = require('mongoose')
const { test, after, describe, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')
const api = supertest(app)
const { expect } = require('expect');



const oneBlog = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]


describe('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

describe('totalLikes', () => {
  test(`sum of likes`, () => {
  const summ = oneBlog.reduce((sum, oneblog) => {
    return sum + oneblog.likes
  }, 0)
  console.log(`sum of likes: ${summ}`)
})
})

describe ('blog contents', () => {
  beforeEach(async () => {
    response = await api.get('/api/blogs')})
    
    test('the first blog is by fjaskl', async () => {
    const firstBlog = response.body[0]
    expect(firstBlog).toBeDefined
    expect(firstBlog.author).toBe('fjaskl')
  })

  test('amount of blogs is ..?', async () => {
    assert.strictEqual(response.body.length, response.body.length)
    console.log(`amount of blogs is: ${response.body.length}`)
  })

    test('id is named id', async () => {
        const blogId = response.body[4]
        const propertyNames = Object.keys(blogId)
        assert.strictEqual(propertyNames[4], 'id')
  })
})

describe('valid blog added', () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            _id: '0123456778',
            title: 'hahalallaal',
            author: 'satu',
            url: 'google.fi',
            likes: 0,
            liked: false
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        //assert.strictEqual(response.body.length, initialNotes.length + 1)
        assert(contents.includes('hahalallaal'))
    })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
