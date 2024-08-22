import { Form, NavLink, redirect, useActionData } from "react-router-dom"
import "./RegistrationPage.css"


export const RegistrationPage = () => {
    const dataFromForm = useActionData()

    return (
        <div className="registrationForm">
                <h1>Registration Form</h1>
                <Form method="put" action={"/registrationPage"}>
                    <input type="text" name="login" placeholder="Login"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="password" name="repeatedPassword" placeholder="Repeat Password"/>
                    <p>Have got account already? <NavLink to="/loginPage">Click Here</NavLink></p>
                    {dataFromForm && dataFromForm.error && <p>{dataFromForm.error}</p>}
                    <button>Submit</button>
                </Form>
        </div>
    )
}


export const registrationAction = async({request}) => {
    const data = await request.formData()

    const login = data.get("login")
    const password = data.get("password")
    const repeatedPassword = data.get("repeatedPassword")

    if (login == ""){
        return {error:"Login cannot be null"}
    } else if (password == ""){
        return {error:"Password cannot be null"}
    } else if (password != repeatedPassword) {
        return {error:"Password and repeated password have to be the same"}
    } 

    const newUser = {
        name:login,
        password:password,
        isAdmin: false,
        id: crypto.randomUUID()
    }

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    }

    try {
        await fetch("http://localhost:3000/users", requestOptions)
    }catch {
        return {error:"Account could not be created, please try again later"}
    }

    return redirect("/loginPage")
}