const User = ({user}) => {

    if (!user) {return null}

    return(
        <div>
            <h2>{user.name}</h2>
            <h4><i>Blogs</i></h4>
            {user.blogs.map(blog =>
            <div key={blog.id}>
                &emsp; <i>{blog.title}</i> 
            </div>
            )}
        </div>
    )
}

export default User