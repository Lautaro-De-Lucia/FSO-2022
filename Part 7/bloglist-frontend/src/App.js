/* eslint-disable */ 

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import CreationMenu from './components/CreationMenu'
import About from './components/About'
import UserList from './components/UserList'
import NavigationMenu from './components/NavigationMenu'
import User from './components/User'

import { useDispatch } from 'react-redux'

import { fetchBlogs } from './reducers/blogsReducer'
import { fetchUsers } from './reducers/usersReducer'
import { checkLogin } from './reducers/userReducer'

import Notification from './components/Notificationv2'


import {
  Routes,
  Route,
  useMatch
} from "react-router-dom"

const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchBlogs()) 
  }, [dispatch]) 

  useEffect(() => {
    dispatch(fetchUsers()) 
  }, [dispatch]) 

  const users = useSelector(({users}) => users)    

  const match = useMatch('/users/:id')

  const user = match 
    ? users.find(user => user.id == match.params.id)
    : null  

  return (
    <div className="container">
      <div>
        <NavigationMenu />
        <h1>Blog App</h1>
      </div>
      <div>
      <Notification />
      <Routes>
        <Route path="/" element={<CreationMenu />} />
        <Route path="/create" element={<CreationMenu />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<UserList/>} />
        <Route path="/users/:id" element={<User user={user}/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      </div>
    </div>
  )
}

export default App


