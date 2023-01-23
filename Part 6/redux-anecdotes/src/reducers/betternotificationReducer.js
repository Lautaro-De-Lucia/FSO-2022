import { createSlice } from '@reduxjs/toolkit'

const initialState = "Anecdote App"

// SLICE DEFINITION
const notificationSlice = createSlice ({
    name:'notification',
    initialState,
    reducers: {
        notify(state,action) {
            const notification = action.payload 
            state = notification
            return notification 
        },
        removeNotification(state,action) {
            const notification = "Anecdote App"
            state = notification
            return notification
        }
    }
})

export const {notify,removeNotification} = notificationSlice.actions

export const setNotification = (content,time) => {
    return async dispatch => {
        dispatch(notify(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000);
    }
  }

export default notificationSlice.reducer