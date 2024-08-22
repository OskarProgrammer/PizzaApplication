import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom"
import "./BasketPage.css"
import { PizzaItem } from "./components/PizzaItem"
import { useEffect, useState } from "react"
import { fetchDataFromEndpoint, fetchDataFromEndpointWithId } from "../../API functions/functions"

export const BasketPage = () => {
    const basketData = useLoaderData()
    const dataFromForm = useActionData()
    let [basketList, setBasketList] = useState(basketData)
    const navigate = useNavigate()

    const removePizza = async (pizzaId) => {
        let newBasketList = []

        
        basketList.map((pizza)=>{
            if (pizza.universalId != pizzaId){
                newBasketList.push(pizza)
            }
        })

        basketList = newBasketList
        setBasketList(basketList)


        const {personId} = await fetchDataFromEndpoint("http://localhost:3000/currentUser")
        const {id, pizzas} = await fetchDataFromEndpointWithId("http://localhost:3000/baskets/", personId)
        let newPizzas = []

        pizzas.map((pizza)=>{
            if (pizza.universalId != pizzaId) {
                newPizzas.push(pizza)
            }
        })

        let newBasket = {
            id: id,
            personId: personId,
            pizzas: newPizzas
        }

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBasket)
        }
        
        try {
            await fetch (`http://localhost:3000/baskets/${personId}`, requestOptions)
        }catch {
            throw Error("Pizzas could not have been removed, please try again later")
        }

        return redirect("/basketPage")
    }

    const howMuchToPay = () => {
        let sum = 0

        basketList.map((pizza)=>{ sum += pizza.price})

        return sum
    }


    useEffect(()=> {
        const check = setTimeout(()=>{navigate(".")},1)
        return () => {
            clearTimeout(check)
        }
    }, [])


    return (
        <div className="basket">
            <div className="basketContainer">
                <div className="basketItems">
                    <h2>Basket Items</h2>
                    {basketList.length == 0 ? "No pizza to display" : basketList.map((pizza)=>{
                        return <PizzaItem   pizzaInfo={pizza}
                                            onRemove={removePizza}/>
                    })}
                </div>

                <div className="basketPayment">
                    <h2>Basket Payment</h2>
                    {basketList.length == 0 ? "Here will be informations about payment" : 
                    <>
                        <p>To pay: {howMuchToPay()}</p>
                        <Form method="post" action={"/basketPage"}>
                            <input type="text" name="city" placeholder="City"/>
                            <input type="text" name="zipCode" placeholder="Zip Code"/>
                            <input type="text" name="street" placeholder="Street"/>
                            {dataFromForm && dataFromForm.error && <p>{dataFromForm.error}</p>}
                            <button>Submit</button>
                        </Form>
                    </>}
                </div>
            </div>
        </div>
    )
}

export const basketLoader = async () => {
    const {personId} = await fetchDataFromEndpoint("http://localhost:3000/currentUser")
    
    let pizza = ""
    
    try {
        pizza = await fetchDataFromEndpointWithId("http://localhost:3000/baskets/",personId)
    }catch {
        return ""
    }

    let {pizzas} = pizza

    let finalBasketInfo = []

    if (pizzas === undefined) {
        return []
    }

    pizzas.map(async (pizza)=>{
        const {name, price, ingredients} = await fetchDataFromEndpointWithId("http://localhost:3000/pizzas/",pizza.pizzaId)

        finalBasketInfo.push({
            name: name,
            ingredients: ingredients,
            price: price[pizza.pizzaSize],
            pizzaId: pizza.pizzaId,
            universalId: pizza.universalId,
            size: pizza.pizzaSize
        })
    })

    return finalBasketInfo
}

export const basketAction = async ({request}) => {
    const data = await request.formData()

    const city = data.get("city")
    const zipCode = data.get("zipCode")
    const street = data.get("street")

    if (city == "" || zipCode == ""){
        return {error: "City and zipcode can not be null"}
    }

    const {personId} = await fetchDataFromEndpoint("http://localhost:3000/currentUser") 
    let usersBasket = {}
    try {
        usersBasket = await fetchDataFromEndpointWithId("http://localhost:3000/baskets/", personId)
    }catch {
        return ""
    }


    let newOrder = usersBasket
    newOrder.city = city
    newOrder.zipCode = zipCode
    newOrder.street = street
    newOrder.universalOrderId = crypto.randomUUID()
    newOrder.status = "Preparing"

    let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
    }

    try {
        await fetch (`http://localhost:3000/orders/`, requestOptions)
    }catch{
        return {error: "Order could not been finished"}
    }

    requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }

    try {
        await fetch (`http://localhost:3000/baskets/${personId}`, requestOptions)
    }catch{
        return {error: "There was an error during removing basket"}
    }

    return redirect("/")
}