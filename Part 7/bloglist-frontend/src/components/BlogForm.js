import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { createBlog } from '../reducers/blogsReducer'
import { userLogOut } from '../reducers/userReducer'

import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {

  const dispatch = useDispatch()
  const currentuser = useSelector(({user}) => user)    

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
    // Improve this ID creation
    blogObject.id = Math.round(Math.random() * 1000)
    console.log('The ID: ',blogObject.id)
    dispatch(createBlog(blogObject))
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  const logOut = () => {
    window.localStorage.clear()
    dispatch(userLogOut())
  }

  return (
    <div>
      <h4><i><b>{currentuser.name}</b> logged in</i> <Button onClick = {logOut}>log out</Button></h4> 
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title: </Form.Label> <Form.Control id='input-title' value={newTitle} onChange={handleTitleChange}/>
          <Form.Label>Author: </Form.Label> <Form.Control id='input-author' value={newAuthor} onChange={handleAuthorChange}/>
          <Form.Label>URL: </Form.Label> <Form.Control id='input-url' value={newURL} onChange={handleURLChange}/>
          <Button type="submit">submit</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
