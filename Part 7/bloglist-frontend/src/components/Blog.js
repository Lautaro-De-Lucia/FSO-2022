import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog,likeBlog }) => {

  const titleStyle = {
    color: 'lightgray',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 0,
    paddingLeft: 0,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'darkgray'
  }

  const detailsStyle = {
    color: 'lightgray',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 0,
    paddingLeft: 0,
    marginBottom: 5,
    backgroundColor: 'darkgray'
  }

  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
    const btn = document.getElementById('button'+blog.id)
    details ? btn.textContent='show details' : btn.textContent='hide details'
  }

  const showDetails = () => {
    return(
      <div style={detailsStyle}>
        URL: {blog.url} <br></br>
        Likes: {blog.likes}
      </div>
    )}

  return(
    <div style={titleStyle}>
      {blog.title} - {blog.author}
      <br></br>
      <Button variant="secondary" id={'button'+blog.id} onClick={toggleDetails}>show details</Button>
      <Button variant="secondary" onClick={(event) => likeBlog(event,blog)}>like</Button>
      {details ? showDetails() : <div></div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}


export default Blog