const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when retrieving the blogs...', () => {
  test('correct amount of blog posts is returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('when adding a new blog...', () => {
  test('a valid blog can be added', async () => {
      const newBlog = {
          title: 'golb',
          author: '???',
          url: 'www.myblog.com/???',
          likes: 123
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()  
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const contents = blogsAtEnd.map(n => n.title)

      expect(contents).toContain(
        'golb'
      )
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: 'rolex',
        author: '???',
        url: 'www.myblog.com/???'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()  

    returnedBlog = blogsAtEnd.find(blog => blog.title === 'rolex')

    expect(returnedBlog.likes).toBe(0)
  })

  test('if the name or url properties are missing from the request, it will return 400 bad request', async () => {
    const newBlog1 = {
        author: '???',
        url: 'www.myblog.com/???',
        likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(400)

    const newBlog2 = {
        title: 'meme',
        author: '???',
        likes: 2
    }  

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)

  })
})


describe('when deleting a blog...', () => {
    test('deletion is successfull and returns 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
    
        const contents = blogsAtEnd.map(r => r.title)
    
        expect(contents).not.toContain(blogToDelete.title)
    })
})

describe('when updating a blog...', () => {
    test('updating the number of likes is susccessfull', async () => {
    
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const newLikes = 13;
        blogToUpdate.likes = newLikes;

        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(blogToUpdate)
          .expect(200)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
        const contents = blogsAtEnd.map(r => r.likes)
    
        expect(contents).toContain(newLikes)
    })
})


afterAll(() => {
    mongoose.connection.close()
})

