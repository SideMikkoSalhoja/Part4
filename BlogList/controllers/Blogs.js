const blogsRouter = require('express').Router()
const Blogs = require('../models/note')
const cors = require('cors')

blogsRouter.use(cors());

blogsRouter.get('/api/blogs', async (request, response) => {
  
  try {
    const foundBlog = await Blogs.find({})
    response.json(foundBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const body = request.body

  const Blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  try {
    const savedBlog = await Blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blogs.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const foundBlog = await Blogs.findById(request.params.id)
    if (foundBlog) {
      response.json(foundBlog)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const Blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  try {
    const savedBlog = await Blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const resoult = await Blogs.findByIdAndDelete(request.params.id)
    resoult.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const Blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedNote = await Blogs.findByIdAndUpdate(request.params.id, Blog, { new: true })
    response.json(updatedNote)
  } catch(exception) {
    next(exception)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

blogsRouter.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
console.error(error.message)

if (error.name === 'CastError') {
  return response.status(400).send({ error: 'malformatted id' })
} 

  next(error)
}

blogsRouter.use(errorHandler)

module.exports = blogsRouter