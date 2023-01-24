/* eslint-disable */

import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

// (1) We create the Redux STORE using configureStore
  //  The store will be a container holding the global state of the application
// (2) We define our application's REDUCERS
  //  A reducier is simply a javascript function that is passed
    //  1. current state and 
    //  2. an ACTION OBJECT 
  //  and uses them to compute and return a new state.
  //  We can define a separate reducer for each React component in our App
const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer,
    users: usersReducer
  }
})

export default store