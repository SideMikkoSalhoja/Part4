const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/note')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Note(helper.initialBlogs[0])
    await noteObject.save()
    noteObject = new Note(helper.initialBlogs[1])
    await noteObject.save()
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, initialBlogs.length)

  })
  
test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })



  test('a valid note can be added ', async () => {
    const newNote = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)
  
    const contents = notesAtEnd.map(n => n.content)
    assert(contents.includes('async/await simplifies making async calls'))
  })
  
  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.notesInDb()
  
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
     assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

after(async () => {
  await mongoose.connection.close()
})

