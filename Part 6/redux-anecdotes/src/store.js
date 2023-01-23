import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/betteranecdoteReducer'
import notificationReducer from './reducers/betternotificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
})

export default store