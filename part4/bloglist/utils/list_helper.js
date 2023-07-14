const dummy = blogs => 1

const totalLikes = blogs => {
  const red = (sum, blog) => sum + blog.likes
  return blogs.length === 0
    ? 0
    : blogs.reduce(red, 0)
}

module.exports = { dummy, totalLikes }
