const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  if (!body.hasOwnProperty('likes')){
    body.likes = 0
  }
  if (!body.hasOwnProperty('title') || !body.hasOwnProperty('url')){
    response.status(400).json(body)
  } else{

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})
*/


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog =  await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.hasOwnProperty('likes')){
    body.likes = 0
  }
  if (!body.hasOwnProperty('title') || body.title === '' || !body.hasOwnProperty('url') || body.url === ''){
    return response.status(400).json({ error: 'missing properties'})
  } 
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id) 
  savedUser = await user.save()
  savedBlog.user = savedUser
  console.log('saved Blog: ',savedBlog)
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // Find user that sent the delete request
  console.log('Hello')
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  // Remove this blog from the user's blog
  console.log('The users blogs:', user.blogs)
  user.blogs = user.blogs.filter(blog => blog != request.params.id) 
  console.log('The users blogs after removal:', user.blogs)
  savedUser = await user.save()
  // Remove the blog itself
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response, next) => {
  const blog =  await Blog.findById(request.params.id)

  const newblog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes+1
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true })
  response.status(200).json(updatedBlog)
})

/*
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})
*/



module.exports = blogsRouter
