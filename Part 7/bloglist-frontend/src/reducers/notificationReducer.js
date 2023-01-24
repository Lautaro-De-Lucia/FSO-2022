/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {message: null, success: false}

const notificationSlice = createSlice ({
    name:'notification',
    initialState,
    reducers: {
        notify(state,action) {
            const notification  = action.payload 
            return notification 
        },
        removeNotification(state,action) {
            return {message:null,success:false}
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