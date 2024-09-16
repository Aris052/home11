import { Link, Outlet } from "react-router-dom"

export const Layout = () => {
    return <div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/add">Add</Link>
        </nav>
        <div className='outlet'>
            <Outlet />
        </div>
    </div>
}