import { Outlet } from 'react-router-dom'
import Appbar from '../components/blogs/Appbar'

function BlogLayout() {
    return (
        <>
            <Appbar />
            <Outlet />
        </>
    )
}

export default BlogLayout