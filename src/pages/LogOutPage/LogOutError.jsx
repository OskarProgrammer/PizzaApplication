import { NavLink, useRouteError } from "react-router-dom"
import "./LogOutError.css"

export const LogOutError = () => {
    const errorMessage = useRouteError()

    return (
        <div className="errorMessage">
            <p>{errorMessage.message}</p>
            <NavLink to="/">Home Page</NavLink>
        </div>
    )
}