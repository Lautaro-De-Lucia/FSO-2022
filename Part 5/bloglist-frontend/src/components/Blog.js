import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog,likeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
    const btn = document.getElementById('detailsbtn')
    details ? btn.textContent='show details' : btn.textContent='hide details'
  }

  const showDetails = () => {
    return(
      <div>
        URL: {blog.url} <br></br>
        Likes: {blog.likes}
      </div>
    )}

  return(
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button id='detailsbtn' onClick={toggleDetails}>show details</button>
      <button onClick={(event) => likeBlog(event,blog)}>like</button>
      {details ? showDetails() : <div></div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}


export default Blog