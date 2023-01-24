import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newLogin } from '../reducers/userReducer'

import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(newLogin(username,password))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification({ message:'wrong username or password',success:false },5))
        }
    }

    return(
        <div>    
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username: </Form.Label>
                    <Form.Control
                    id="username-login"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
                    <Form.Label>password: </Form.Label>
                    <Form.Control 
                    id="password-login"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>
                <Button variant="primary" id="login-button" type="submit">login</Button>
            </Form>
        </div>
    )
}

export default LoginForm
