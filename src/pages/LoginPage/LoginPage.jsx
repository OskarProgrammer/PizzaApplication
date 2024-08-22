import { Form, NavLink, redirect, useActionData } from "react-router-dom"
import "./LoginPage.css"
import { fetchDataFromEndpoint } from "../../API functions/functions"

export const LoginPage = () => {
    const dataFromForm = useActionData()

    return (
        <div className="loginForm">
                <h1>Login Form</h1>
                <Form method="put" action={"/loginPage"}>
                    <input type="text" name="login" placeholder="Login"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <p>Haven't got account yet? <NavLink to="/registrationPage">Click Here</NavLink></p>
                    {dataFromForm && dataFromForm.error && <p>{dataFromForm.error}</p>}
                    <button>Submit</button>
                </Form>
        </div>
    )
}

export const loginAction = async({request}) => {
    const data = await request.formData()

    const login = data.get("login")
    const password = data.get("password")

    if (login == ""){
        return {error: "Login cannot be null"}
    } else if (password == ""){
        return {error: "Password cannot be null"}
    }

    const usersData = await fetchDataFromEndpoint("http://localhost:3000/users")
    let isFound = false
    let newCurrent = ""

    usersData.map((user)=>{
        if (user.name == login && user.password == password){
            isFound = true
            newCurrent = {
                name: user.name,
                password: user.password,
                personId: user.id,
                isAdmin: user.isAdmin,
                isLogged: true,
            }
        }
    })

    if (!isFound) {
        return {error: "Login or password is invalid"}
    }

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCurrent)
    }

    try {
        await fetch ("http://localhost:3000/currentUser", requestOptions)
    }catch{
        return {error: "There was an error on the server side, please try again later"}
    }
    
    return redirect("/")
}