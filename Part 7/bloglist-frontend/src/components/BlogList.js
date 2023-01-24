import Blog from './Blog'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { setLike,removeBlog } from '../reducers/blogsReducer'


const BlogList = () => {

    const blogs = useSelector(({blogs}) => blogs)    
    const currentuser = useSelector(({user}) => user)    
    const dispatch = useDispatch()

    const deleteBlog = (event,Blog) => {
        if(!window.confirm('Delete ' + Blog.title + ' ?')){
          return
        }
        dispatch(removeBlog(Blog))
    }

    const likeBlog = (event,Blog) => {
        dispatch(setLike(Blog))
    }

    const conditionalDelete = (blog) => {
        if (currentuser !== null && blog.user.username === currentuser.username){
          return <button onClick={(event) => deleteBlog(event,blog)}>delete</button>
        }
    }

    return(
        <div>
            <ul>
            {blogs.map(blog =>
            <div key={blog.id}>
                <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                />
                {conditionalDelete(blog)}
            </div>
            )}
            </ul>
        </div>
    )
}

export default BlogList