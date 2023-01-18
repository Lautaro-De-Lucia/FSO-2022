import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>Title: <input id='input-title' value={newTitle} onChange={handleTitleChange}/></div>
      <div>Author: <input id='input-author' value={newAuthor} onChange={handleAuthorChange}/></div>
      <div>URL: <input id='input-url' value={newURL} onChange={handleURLChange}/></div>
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm
