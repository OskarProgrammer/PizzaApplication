import { redirect } from "react-router-dom"

export const LogOutPage = () => {
    return (<></>)
}

export const logOutPageLoader = async () => {
    const newCurrent = {
        name: "",
        password: "",
        personId: "",
        isAdmin: false,
        isLogged: false
    }
    
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCurrent)
    }

    try {
        await fetch ("http://localhost:3000/currentUser", requestOptions)
    }catch { 
        throw Error("There was an error during log out process")
    }

    return redirect("/")
}