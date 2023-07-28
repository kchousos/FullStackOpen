const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Initial state of database', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have id', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })

})

describe('Creation of blog', () => {

  test('Blog is successfully created by POST', async () => {
    const newBlog = {
      title: 'SICP in Emacs',
      author: 'Konstantinos Chousos',
      url: 'https://kchousos.github.io/posts/sicp-in-emacs/',
      likes: 20,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('SICP in Emacs')
  })

  test('Missing \'likes\' defaults to 0', async () => {
    const newBlog = {
      title: 'How the Grinch stole the Haskell Heap',
      author: 'Edward Z. Yang',
      url: 'http://blog.ezyang.com/2011/04/how-the-grinch-stole-the-haskell-heap/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')

    const receivedBlog = response.body.find(b => b.author === 'Edward Z. Yang')

    expect(receivedBlog.likes.toString() === '0')
  })

  test('Blog that misses title or URL is rejected', async () => {
    const missing = {
      author: 'John Doe',
      likes: 8,
    }

    await api
      .post('/api/blogs')
      .send(missing)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('ID operations', () => {

  test('delete a blog by its id', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
