import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/betteranecdoteReducer'
import { setNotification } from '../reducers/betternotificationReducer'


const AnecdoteList = (props) =>{
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const newVote = (anecdote) => { 
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }
    

    return(
        <div>
        {state.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => newVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}


export default AnecdoteList