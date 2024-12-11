const { test, after, before, describe, it } = require('node:test')
const assert = require('assert');
const mongoose = require('mongoose');
const Blog = require('../models/note');
const blogid = require('../utils/for_testing').testBlogIdField
const dotenv = require('dotenv');
const { app } = require('../app');
const supertest = require('supertest');

dotenv.config()

before(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });


  describe('POST /api/blogs', () => {
    it('should default likes to 0 if missing in the request', async () => {
      const initialBlogs = await Blog.find({});
      
      const newBlog = {
        title: 'Test Blog Without Likes',
        author: 'John Doe',
        url: 'http://example.com'
      };
  
      const response = await supertest(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(201);
  
      const blogsAfterPost = await Blog.find({});
      
      const createdBlog = blogsAfterPost[blogsAfterPost.length - 1];
  
      assert.strictEqual(createdBlog.likes, 0);
  
      assert.strictEqual(blogsAfterPost.length, initialBlogs.length + 1);
    });
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog post and increase the number of blogs by 1', async () => {
      const initialBlogs = await Blog.find({});
      const newBlog = {
        title: 'Test Blog',
        author: 'John Doe',
        url: 'http://example.com',
        likes: 10
      };
  
      const response = await supertest(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(201);
  
      const blogsAfterPost = await Blog.find({});
      assert.strictEqual(blogsAfterPost.length, initialBlogs.length + 1);
    });
  });

  describe('POST /api/blogs', () => {
    it('should respond with 400 if title is missing', async () => {
      const initialBlogs = await Blog.find({});
      
      const newBlogWithoutTitle = {
        author: 'John Doe',
        url: 'http://example.com',
        likes: 10
      };
  
      const response = await supertest(app)
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400); 
  
      const blogsAfterPost = await Blog.find({});
      assert.strictEqual(blogsAfterPost.length, initialBlogs.length);
    });
  
    it('should respond with 400 if url is missing', async () => {
      const initialBlogs = await Blog.find({});
      
      const newBlogWithoutUrl = {
        title: 'Test Blog Without URL',
        author: 'John Doe',
        likes: 10
      };
  
      const response = await supertest(app)
        .post('/api/blogs')
        .send(newBlogWithoutUrl)
        .expect(400);
  
      const blogsAfterPost = await Blog.find({});
      assert.strictEqual(blogsAfterPost.length, initialBlogs.length);
    });
  });