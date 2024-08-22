import { NavLink, useRouteError } from "react-router-dom"
import "./AdminError.css"



export const AdminError = () => {
    const errorMessage = useRouteError()

    return (
        <div className="noAdminError">

            <h1>
                <p>ERROR!</p>
                <p>Error Message: {errorMessage.message}</p>
            </h1>
            <div>
                <NavLink to="/">Home Page</NavLink>
            </div>
        </div>
    )
}