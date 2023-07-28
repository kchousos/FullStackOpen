const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let BlogObject = new Blog(helper.initialBlogs[0])
  await BlogObject.save()

  BlogObject = new Blog(helper.initialBlogs[1])
  await BlogObject.save()

  BlogObject = new Blog(helper.initialBlogs[2])
  await BlogObject.save()

  BlogObject = new Blog(helper.initialBlogs[3])
  await BlogObject.save()

  BlogObject = new Blog(helper.initialBlogs[4])
  await BlogObject.save()

  BlogObject = new Blog(helper.initialBlogs[5])
  await BlogObject.save()
})

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

afterAll(async () => {
  await mongoose.connection.close()
})
