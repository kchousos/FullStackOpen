import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(0)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { title, author, url }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`Succesfully Added "${title}" by ${author}!`)
        setTimeout(() => { setMessage(null) }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  const handleTitleChange = e => setTitle(e.target.value)
  const handleAuthorChange = e => setAuthor(e.target.value)
  const handleUrlChange = e => setUrl(e.target.value)

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:
      <input
        value={title}
        onChange={handleTitleChange}
      />
      <br/>
      author:
      <input
        value={author}
        onChange={handleAuthorChange}
      />
      <br/>
      url:
      <input
        value={url}
        onChange={handleUrlChange}
      />
      <br/>
      <button type="submit">save</button>
    </form>  
  )

  if (user === null) {
    return (
      <>
        <Notification message={message} error={isError}/>
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
      <Notification message={message} error={isError}/>
      <p>{user.name} logged in</p>
      <button
        onClick={handleLogout}>
        logout
      </button>
      <h2>blogs</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App
