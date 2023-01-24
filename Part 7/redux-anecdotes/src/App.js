import {useEffect} from 'react'
import AnecdoteForm from './components/BetterAnecdoteForm'
import AnecdoteList from './components/BetterAnecdoteList'
import Notification from './components/BetterNotification'
import { fetchAnecdotes } from './reducers/betteranecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  // (4) On our app's startup we need to fetch all anecdotes to display them. Since
  //  the display of these anecdotes ins handled by the AnecdoteList component, fetching them
  //  implies a change of state on this component and thus has to be handled by redux. In other
  //  words, fetching the anecdotes is an ACTION that needs to be dispatched to the REDUCER
  //  that manages the state of the anecedote list.
  //  This is why we need to call the dispatch() method that allows us to send actions to the store.
  //  useDispatch() is a method provided by Redux's Hooks API that allows us to have access to the 
  //  dispatch method from anywhere in our code.
  //  We call the ACTION CREATOR method fetchAnecdotes() to get the action that fetches the anecdotes
  //  and DISPATCH this action to the store.  
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