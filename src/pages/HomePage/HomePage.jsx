import { redirect, useLoaderData, useNavigate } from "react-router-dom"
import "./HomePage.css"
import { refresh } from "../OrdersDetails/OrdersDetails"
import { fetchDataFromEndpoint, fetchDataFromEndpointWithId } from "../../API functions/functions"

export const HomePage = () => {
    const navigate = useNavigate()
    const [currentUserData, pizzas] = useLoaderData()

    refresh(navigate)

    const addToBasket = async (pizzaInfo) => {
        const size = (prompt("large | medium | small")).toLowerCase()

        if (size != "large" && size != "medium" && size != "small" ){ return }


        let isFound = false
        let requestOptions = {}

        try {
            await fetchDataFromEndpointWithId("http://localhost:3000/baskets/",currentUserData.personId)
            isFound = true
        }catch {
            isFound = false
        }

        if (!isFound) {
            let newBasket = {
                "id": currentUserData.personId,
                "personId": currentUserData.personId,
                "pizzas": []
            }

            requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBasket)
            }

            try {
                await fetch("http://localhost:3000/baskets", requestOptions)
            }catch {
                throw Error("Basket could not been added")
            }
        }

        let {pizzas} = await fetchDataFromEndpointWithId("http://localhost:3000/baskets/",currentUserData.personId)
        
        pizzas.push({
            "pizzaId": pizzaInfo.id,
            "pizzaSize": size,
            "universalId": crypto.randomUUID()
          })

        let newPizzas = {
            pizzas: pizzas
        }

        requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPizzas)
        }

        try {
            await fetch(`http://localhost:3000/baskets/${currentUserData.personId}`,requestOptions)
        }catch{
            throw Error("Pizzas could not have been added")
        }
        
        return redirect("/")
    }




    return (
        <div className="homePage">
            <h1>Our Pizzas !</h1>
            {pizzas.map((pizza)=>(
                <div className="pizzaTab">
                    <h2>{pizza.name}</h2>
                    <p>Ingredients: {pizza.ingredients.map((ingredient)=>{return `${ingredient} `})}</p>
                    <p>Large {pizza.price["large"]}</p>
                    <p>Medium {pizza.price["medium"]}</p>
                    <p>Small {pizza.price["small"]}</p>
                    {currentUserData.isLogged ? <button onClick={()=>{addToBasket(pizza)}}>Add to basket</button> : <button disabled>Add to basket</button>}
                </div>
            ))}
        </div>
    )
}

export const homePageLoader = async() => {
    const currentUserData = await fetchDataFromEndpoint("http://localhost:3000/currentUser")
    const pizzasInfo = await fetchDataFromEndpoint("http://localhost:3000/pizzas")


    return [currentUserData, pizzasInfo]
}