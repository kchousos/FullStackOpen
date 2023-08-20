import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(0)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Succesfully logged in!')
      setTimeout(() => { setMessage(null) }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setError(1)
      setTimeout(() => {
        setMessage(null)
        setError(0)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setMessage('Succesfully logged out!')
    setTimeout(() => { setMessage(null) }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
        setMessage(`Succesfully Added "${blogObject.title}" by ${blogObject.author}!`)
        setTimeout(() => { setMessage(null) }, 5000)
      })
  }

  const handleLikes = async (blog) => {
    const newBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    setBlogs(blogs.map(b => b.id === blog.id ? { ...b, ...newBlog } : b).sort((a, b) => b.likes - a.likes))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Really remove blog "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id).sort((a, b) => b.likes - a.likes))
    }
  }

  if (user === null) {
    return (
      <>
        <Notification message={message} error={isError} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  return (
    <>
      <Notification message={message} error={isError} />
      <p>
        {user.name} logged in
        <button
          onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>blogs</h2>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <r />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}

          canDelete={blog.user && blog.user.username === user.username}
          handleDelete={handleDelete} />
      )}
    </>
  )
}

export default App
