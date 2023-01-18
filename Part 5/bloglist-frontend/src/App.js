import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
//=======================<STATE HOOKS>==========================//

  const [blogs, setBlogs] = useState([])
  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newURL, setNewURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //=======================<EFFECT HOOKS>==========================//
  // On start-up, retrieve all blogs from the backend.
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      }).catch(error => {console.log('ERROR: ',error)})
  }, [])
  // If local storage has a record of a logged in user, set the user to the App's state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user) // User is not-null and login form won't be called
      blogService.setToken(user.token) // Set token on server communication module
    }
  }, [])

  //=======================<EFFECT HOOKS>==========================//
  // (3 ) Once user submits login data, 'user' state changes to the logged user
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // Login Credentials (username and password)
      const user = await loginService.login({ username, password })
      // If credentials are found on the server, set user as logged in (not null)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      setSuccessMessage('Successfully Logged In')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      // If credentials are not found on the server, set error for 5 seconds
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  /*
  const addBlog = (event) => {
  // (6) Create new blog object and append it to the server
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    // Add current state of Title, Author and URL to a 'Blog' object
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      id: blogs.length + 1,
    }
    console.log('Adding new blog: ',blogObject)
    // Create it on server. If successfull, append it to blogs on the frontend.
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        setSuccessMessage(returnedBlog.title + ' added successfully!')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage('ERROR: ' + error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  */
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.id = blogObject.id + 1
    console.log('sending new object: ',blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('The returned blog: ',returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(returnedBlog.title + ' added successfully!')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage('ERROR: ' + error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
    setSuccessMessage('Successfully Logged Out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const likeBlog = (event,Blog) => {
    console.log(Blog)
    blogService
      .like(Blog.id)
      .then(returnedBlog => {
        setSuccessMessage(returnedBlog.title + ' liked!')
        const newBlogs = blogs.map(blog => {
          if(blog.id === Blog.id) {
            blog.likes = blog.likes + 1
          }
          return blog
        })
        setBlogs(newBlogs)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage('ERROR: ' + error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (event,Blog) => {
    if(!window.confirm('Delete ' + Blog.title + ' ?')){
      return
    }
    blogService
      .remove(Blog.id)
      .then(() => {
        setSuccessMessage(Blog.title + ' successfully removed')
        const newBlogs = blogs.filter(blog => blog.id !== Blog.id)
        setBlogs(newBlogs)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage('ERROR: ' + error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  /*
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }
  */
  const loginForm = () => (
    // (2) User will submit the data to this form object
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          id="username-login"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-login"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
  /*
  const blogForm = () => (
    // (5) Blog submission calls the addBlog event handler
    <form onSubmit={addBlog}>
      <div>Title: <input value={newTitle} onChange={handleTitleChange}/></div>
      <div>Author: <input value={newAuthor} onChange={handleAuthorChange}/></div>
      <div>URL: <input value={newURL} onChange={handleURLChange}/></div>
      <button type="submit">submit</button>
    </form>
  )
  */

  const conditionalDelete = (blog) => {
    if (user !== null && blog.user.username === user.username){
      return <button onClick={(event) => deleteBlog(event,blog)}>delete</button>
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={errorMessage} success={false} />
      <Notification message={successMessage} success={true}/>

      {user === null ?
        loginForm() : // (1) On startup, only login form will show.
        // (4) If login is successfull, render blog form instead.
        <div>
          <p>{user.name} logged in</p>
          <button onClick = {logOut}>log out</button>
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
        </div>
      }

      <ul>
        {blogs.sort((bg1, bg2) => bg2.likes - bg1.likes).map(blog =>
          <div key={blog.id}>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
            />
            {conditionalDelete(blog)}
          </div>
        )}
      </ul>
    </div>
  )
}

export default App



/*
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
*/