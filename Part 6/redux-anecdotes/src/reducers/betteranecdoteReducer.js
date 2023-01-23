import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../services/anecdotes'

// INITIAL STATE

const initialState = []

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((a1,a2) => a2.votes - a1.votes)
}

// SLICE DEFINITION
const anecdoteSlice = createSlice ({
    name:'anecdotes',
    initialState,
    reducers: {  
        vote(state,action){
            const id = action.payload.id 
            return sortByVotes(state.map(anecdote => anecdote.id === id? {...anecdote,votes: anecdote.votes + 1} : anecdote))
        },
        appendAnecdote(state, action) {
          state.push(action.payload)
        },
        initializeAnecdotes(state, action) {
          return action.payload
        }
    }
})

export const {vote, appendAnecdote,initializeAnecdotes} = anecdoteSlice.actions


export const fetchAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()
    dispatch(initializeAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await AnecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await AnecdoteService.addVote(anecdote)
    dispatch(vote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer