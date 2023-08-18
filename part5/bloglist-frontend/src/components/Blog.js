import { useState } from 'react'

const Blog = ({ blog }) => {
  const [info, setInfo] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    // border: 'solid',
    // borderWidth: 1,
    marginBottom: 5
  }

  if (info === false) {
    return (
      <div style={blogStyle}>
        <div className='blog'>
          {blog.title} {blog.author}
          <button
            type="submit"
            onClick={() => setInfo(true)}>
            view
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title}
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button type="submit">like</button>
        <br/>
        {blog.author}
      </div>
      <button
        type="submit"
        onClick={() => setInfo(false)}>
        hide
      </button>
    </div>
  )
}

export default Blog
