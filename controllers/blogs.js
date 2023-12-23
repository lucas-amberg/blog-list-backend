const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs)
})

const getTokenFrom = request => {
  
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({error: 'content missing'})
  }


  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)
   
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    user: user.id,
    url: body.url
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  const user = jwt.verify(request.token, process.env.SECRET)

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({error: 'you are not authorized to delete this blog'})
  }
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