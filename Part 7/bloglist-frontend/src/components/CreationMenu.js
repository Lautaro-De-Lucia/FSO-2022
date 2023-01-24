
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'

const CreationMenu = () => {

  const user = useSelector(({user}) => user)    

  return(
    <div>
      {user === null ? <LoginForm /> : <BlogForm />}
    </div>
  )

}

export default CreationMenu