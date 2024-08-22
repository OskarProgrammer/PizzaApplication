import { NavLink, Outlet } from "react-router-dom"
import "./AdminLayout.css"


export const AdminLayout = () => {

    return(
        <>
            <div className="admin-layout">
                <h1>Admin Panel</h1>
                <nav>
                    <NavLink to="users">Users list</NavLink>
                    <NavLink to="orders">Orders list</NavLink>
                </nav>
                <Outlet/>

            </div>
                
        </>
    )
}