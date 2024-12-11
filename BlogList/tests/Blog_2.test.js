const { test, after, before, describe, it } = require('node:test')
const assert = require('assert');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

before(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });


describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  
      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })
  })

describe('updating the number of likes for a blog', () => {
    test('succeeds with valid data', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
  
      const updatedData = { likes: blogToUpdate.likes + 1 }
  
      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}/likes`)
        .send(updatedData)
        .expect(200)
  
      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })
  
    test('fails with status code 400 if likes is missing', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
  
      const updatedData = {}
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}/likes`)
        .send(updatedData)
        .expect(400)
    })
  })