import { useLoaderData, useNavigate, useParams, useRevalidator } from "react-router-dom"
import "./OrdersDetails.css"
import { fetchDataFromEndpoint, fetchDataFromEndpointWithId } from "../../API functions/functions"
import { useEffect, useState } from "react"

export const refresh = (navigate) => {
    useEffect(()=> {
        const check = setTimeout(()=>{navigate(".")},1)
        return () => {
            clearTimeout(check)
        }
    }, [])
}

export const OrdersDetails = () => {
    const {id} = useParams()
    const [pizzasInfo,status] = useLoaderData()
    const [pizzas, setPizzas] = useState(pizzasInfo)
    const navigate = useNavigate()

    refresh(navigate)

    return (
        <div className="orderDetails">
            <h1>Details of the order
                <p>{id}</p>
                <p>Status of the order: {status}</p>
            </h1>
            <p>Pizzas in this order:</p>
            {pizzas.map(pizza=>(
                <div className="pizzaTab">
                    <p>Type: {pizza.name}</p>
                    <p>Price: {pizza.price}</p>
                    <p>Size: {pizza.size}</p>
                </div>
            ))}
        </div>
    )
}

export const ordersDetailsLoader = async ({params}) => {
    const { id } = params
    let isFound = false
    let status = ""

    const orders = await fetchDataFromEndpoint("http://localhost:3000/orders")
    let pizzas = []

    orders.map((order)=>{
        if (order.universalOrderId == id){
            isFound = true
            pizzas = order.pizzas
            status = order.status
        }
    })

    if (!isFound){
        throw Error("Order not found")
    }

    let infoAboutPizzas = []
    pizzas.map( async (pizza)=>{
        const {name, price, ingredients} = await fetchDataFromEndpointWithId("http://localhost:3000/pizzas/",pizza.pizzaId)
        infoAboutPizzas.push({
            name:name,
            price: price[pizza.pizzaSize],
            ingredients: ingredients,
            size: pizza.pizzaSize
        })
    })

    return [infoAboutPizzas,status]
}