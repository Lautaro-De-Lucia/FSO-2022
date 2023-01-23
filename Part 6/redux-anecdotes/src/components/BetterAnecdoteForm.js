import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/betteranecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) =>{
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return(
        <div>
        <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        <br></br>
        </div>
    )
}


export default AnecdoteForm