import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={addBlog}>
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br/>
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>
        url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br/>
        <button type="submit">save</button>
      </form>  
    </>
  )
}

export default BlogForm
