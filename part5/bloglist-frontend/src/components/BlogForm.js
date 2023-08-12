const BlogForm = ({
  title,
  author,
  url,
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => (
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

export default BlogForm
