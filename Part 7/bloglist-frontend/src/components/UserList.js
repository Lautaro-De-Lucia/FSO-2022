import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'

const UserList = () => {

    const users = useSelector(({users}) => users)    
    
    return(
        <div>
            <h2>Users</h2>
            <Table striped size="sm">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                {users.map( (user,index) => (
                        <tr key={index}>
                            <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td> 
                            <td> {user.blogs.length} </td>
                        </tr>
                        )
                    )
                }
                </tbody>
            </Table>
            
        </div>
    )
}

export default UserList