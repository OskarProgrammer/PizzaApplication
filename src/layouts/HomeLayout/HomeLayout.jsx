import { Outlet, NavLink, useLoaderData } from "react-router-dom"
import "./HomeLayout.css"
import { fetchDataFromEndpoint } from "../../API functions/functions"
import { useState } from "react"

export const HomeLayout = () => {
    const dataFromLoader = useLoaderData()

    return (
        <div className="root-layout">
            <header>Pizza App</header>
            <nav>
                <NavLink to="/">Home Page</NavLink>
                {dataFromLoader.isLogged ? "" : <NavLink to="/loginPage">Sign in</NavLink>}
                {dataFromLoader.isLogged ? "" : <NavLink to="/registrationPage">Sign up</NavLink>}
                {dataFromLoader.isLogged ? <NavLink to="/ordersPage">Orders</NavLink> : ""}
                {dataFromLoader.isLogged ? <NavLink to="/basketPage">Basket</NavLink> : ""}
                {dataFromLoader.isLogged ? <NavLink to="/logOutPage">Log Out</NavLink> : ""}
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export const homeLayoutLoader = async() => {
    const currentUser = await fetchDataFromEndpoint("http://localhost:3000/currentUser")

    return currentUser
}