/* eslint-disable */ 
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { fetchUsers } from './usersReducer'

const initialState = []

const sortByLikes = (blogs) => {
    return blogs.sort((bg1,bg2) => bg2.likes - bg1.likes)
}

const blogSlice = createSlice ({
    name:'blogs',
    initialState,
    reducers: {
        initializeBlogs(state, action) {
            return sortByLikes(action.payload)
        },  
        appendBlog(state, action) {
          state.push(action.payload)
        },
        like(state,action) {
            const likedBlog = action.payload
            state.map(blog => {
                if(blog.id === likedBlog.id) {
                  blog.likes = blog.likes + 1
                }
                return blog
            })
        },
        sortBlogs(state,action){
            state.sort((bg1,bg2) => bg2.likes - bg1.likes)
        },
        del(state,action){
          const blogToDelete = action.payload
          return state.filter(blog => blog.id !== blogToDelete.id)
        }
    }
})

export const {initializeBlogs, appendBlog, like,del, sortBlogs} = blogSlice.actions

export const fetchBlogs = () => {
  return async dispatch => {
    blogService
        .getAll()
        .then(initialBlogs => {
            dispatch(initializeBlogs(initialBlogs))
        }).catch(error => {console.log('ERROR: ',error)})
    }
}

export const createBlog = newBlog => {
  return async dispatch => {
    blogService
        .create(newBlog)
        .then(returnedBlog => {
        dispatch(appendBlog(returnedBlog))
        dispatch(setNotification({message:'added succesfully!',success:true}, 5))
        dispatch(fetchUsers())
        }).catch(error => {
        dispatch(setNotification({message:'ERROR!' + error.response.data.error,success:false}, 5))
        })
    }
}

export const setLike = blogToLike => {
    return async dispatch => {
        blogService.like(blogToLike.id)
            .then(returnedBlog => {
                dispatch(like(blogToLike))
                dispatch(setNotification({message: returnedBlog.title + ' liked!',success:true}, 5))
                dispatch(sortBlogs())
            }).catch(error => {
                dispatch(setNotification({message:'ERROR!' + error.response.data.error,success:false}, 5))
            })
    }
}

export const removeBlog = blogToDelete => {
    return async dispatch => {
        blogService
            .remove(blogToDelete.id)
            .then(() => {
                dispatch(del(blogToDelete))
                dispatch(setNotification({message:'succesfully removed ' + blogToDelete.title,success:true}, 5))
                dispatch(fetchUsers())
            }).catch(error => {
                dispatch(setNotification({message:'ERROR!' + error.response.data.error,success:false}, 5))
            })
    }
}


export default blogSlice.reducer