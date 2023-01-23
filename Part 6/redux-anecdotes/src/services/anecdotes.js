import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => { 
  const object = { content , id:getId() , votes:0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (anecdote) => {
  const newAnecdote = {content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1} 
  const request = axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default {
    getAll,
    createNew,
    addVote
  }