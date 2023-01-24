const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((acc,blog) => acc + blog.likes,0)
}  

const favoriteBlog = (blogs) => {
  favBlog = blogs.reduce((max, current) => max.likes > current.likes ? max : current)
  return {title : favBlog.title,author : favBlog.author,likes : favBlog.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}