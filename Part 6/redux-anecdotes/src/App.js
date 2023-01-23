import {useEffect} from 'react'
import AnecdoteForm from './components/BetterAnecdoteForm'
import AnecdoteList from './components/BetterAnecdoteList'
import Notification from './components/BetterNotification'
import { fetchAnecdotes } from './reducers/betteranecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnecdotes()) 
  }, [dispatch]) 

  return (
    <div>
      <h2>Anecdotes</h2>
        <Notification/>
        <AnecdoteForm/>
        <AnecdoteList/>
    </div>
  )
}

export default App