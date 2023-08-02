const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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
      helper.initialBlogs.length - 1,
    )

    const titles = blogsAtEnd.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update a blog', () => {
  test('update blog', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`).send({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    })
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    const updatedBlog = blogsAtEnd.body[0]
    expect(updatedBlog.likes === blogToUpdate.likes + 1)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'as',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      name: 'Superuser',
      password: 'aa',
    }

    const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
