/* eslint-disable */ 
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice ({
    name:'user',
    initialState,
    reducers: {
        updateUser(state, action) {
            return action.payload
        }
    }
})

export const {updateUser} = userSlice.actions

export const checkLogin = () => {
    return async dispatch => {
        console.log('Checking local storage...')
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
          const loggedUser = JSON.parse(loggedUserJSON)
          blogService.setToken(loggedUser.token) // Set token on server communication module
          dispatch(updateUser(loggedUser))
        }
    }
}

export const newLogin = (username,password) => {
  return async dispatch => {
        loginService.login({ username, password }).then(user => {
            blogService.setToken(user.token)
            console.log('Saving user to local storage')
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            dispatch(updateUser(user))
            dispatch(setNotification({ message:'Succesfully Logged in',success:true }, 5))
        }).catch(error =>{
            dispatch(setNotification({ message:'Wrong Username or Password',success:false }, 5))
        })
    }
}

export const userLogOut = (username,password) => {
    return async dispatch => {
        dispatch(updateUser(null))
        dispatch(setNotification({message:'Successfully Logged Out!',success:true}, 5))
    }
  }

export default userSlice.reducer