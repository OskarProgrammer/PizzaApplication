import { NavLink, Outlet } from "react-router-dom"
import "./AdminLayout.css"
import { fetchDataFromEndpoint } from "../../API functions/functions"


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

export const adminLayoutLoader = async () => {
    const currentUser = await fetchDataFromEndpoint("http://localhost:3000/currentUser")

    if (!currentUser.isAdmin){
        throw Error("No priviliges to get to admin panel")
    }

    return ""
}