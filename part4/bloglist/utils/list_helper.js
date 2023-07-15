const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs => {
  const red = (sum, blog) => sum + blog.likes
  return blogs.length === 0
    ? 0
    : blogs.reduce(red, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((ablog, bblog) => {
    ablog.likes > bblog.likes ? ablog : bblog, { likes: -1 }
  })
}

const mostBlogs = blogs => {
  return _(blogs)
        .groupBy('author')
        .map((info, author) => ({ author: author, blogs: info.length }))
        .maxBy(a => a.blogs)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
