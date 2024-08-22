import { redirect, useLoaderData } from "react-router-dom"
import { fetchDataFromEndpoint } from "../../API functions/functions"
import "./UsersPage.css"
import { useState } from "react"


export const UsersPage = () =>{
    const usersList = useLoaderData()
    let [users, setUsers] = useState(usersList)

    const removeUser = async (userInfo) => {
        let newUsers = []

        users.map((user)=>{
            if (user.id != userInfo.id){
                newUsers.push(user)
            }
        })

        users = newUsers
        setUsers(users)

        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }

        try {
            await fetch(`http://localhost:3000/users/${userInfo.id}`, requestOptions)
        }catch {
            throw Error("Deleting the user failed")
        }

        return redirect(".")
    }

    return (
        <div className="usersList">
            <h1>Users List</h1>
            {users.map((user)=>(
                <div className="userItem">
                    <h3>{user.name}</h3>
                    <p>Password: {user.password}</p>
                    <p>Key: {user.id}</p>
                    <button onClick={()=>{removeUser(user)}}>Remove</button>
                </div>
            ))}
        </div>
    )
}

export const usersListLoader = async() => {
    let users = await fetchDataFromEndpoint("http://localhost:3000/users")
    let currentUser = await fetchDataFromEndpoint("http://localhost:3000/currentUser")


    let data = []
    users.map((user)=>{
        if (user.id != currentUser.personId) {
            data.push(user)
        }
    })

    return data
}