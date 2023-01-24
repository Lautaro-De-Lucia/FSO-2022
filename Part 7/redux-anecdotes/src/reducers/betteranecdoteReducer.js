import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../services/anecdotes'

// INITIAL STATE

const initialState = []

const sortByVotes = (anecdotes) => {
  return anecdotes.sort((a1,a2) => a2.votes - a1.votes)
}

// (7) We use createSlice from the REDUX TOOLKIT to easily define a reducer.
// We need to give it a name and define the initial state. Then provide a collection
// of reducer functions which will be called from our action creators. 
const anecdoteSlice = createSlice ({
    name:'anecdotes',
    initialState,
    reducers: {  
        vote(state,action){
            //  (8) Arguments passed to the action creator below will be stored in the
            //  'payload' property of the action
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

// (5) ACTION CREATORS are implemented here using the REDUX THUNK library.
//  This library allows us to define asynchronous actions creators. The
//  following function returns a THUNK FUNCTION. This thunk function is
//  dispatched to the store in App.js. The store will run the function,
//  and the initial anecdotes will be dispatched to the store only when
//  fetching the anecdotes from the server is complete (this is why
//  we seem to have two calls to dispatch())
export const fetchAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()
    dispatch(initializeAnecdotes(anecdotes))
  }
}


//  (6) We pass the arguments to the action creator, and these are used
//  in the THUNK's asynchronous operation.
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