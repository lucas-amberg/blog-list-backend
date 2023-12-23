const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({error: 'content missing'})
  }


  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => {
      logger.error('error posting to API: ', error.message)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = new Blog(request.body)
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
  response.status(200).json(result)
})

module.exports = blogsRouter