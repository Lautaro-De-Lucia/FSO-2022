/* eslint-disable */ 
import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

const usersSlice = createSlice ({
    name:'users',
    initialState,
    reducers: {
        initializeUsers(state, action) {
            return action.payload
        },
        sortUsers(state,action){
            return state.sort((u1,u2) => u2.blogs.length - u1.blogs.length)
        }
    }
})

export const {initializeUsers, sortUsers} = usersSlice.actions

export const fetchUsers = () => {
  return async dispatch => {
    usersService
        .getAll()
        .then(initialUsers => {
            dispatch(initializeUsers(initialUsers))
            dispatch(sortUsers())
        }).catch(error => {console.log('ERROR: ',error)})
    }
}

export default usersSlice.reducer