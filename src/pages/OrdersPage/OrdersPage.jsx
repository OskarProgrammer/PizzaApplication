import { Link, useLoaderData } from "react-router-dom"
import { fetchDataFromEndpoint, fetchDataFromEndpointWithId } from "../../API functions/functions"
import "./OrdersPage.css"

export const OrdersPage = () => {
    const dataLoader = useLoaderData()

    return (
        <div className="ordersTab">
            <h1>Your orders: </h1>
            {dataLoader.map((order)=>(
                <div className="order">
                    <Link to={`/${order.universalOrderId}`}>
                        <p>Order with key :{order.universalOrderId}</p>
                        <p>Pizzas: {order.pizzas.length}</p>
                    </Link> 
                    <br />
                </div>
            ))}
        </div>
    )
}

export const ordersLoader = async() => {
    const {personId} = await fetchDataFromEndpoint("http://localhost:3000/currentUser")
    const orders = await fetchDataFromEndpoint("http://localhost:3000/orders")
    let personOrders = []

    orders.map((order)=>{
        if (order.personId == personId || order.id == personId) {
            personOrders.push(order)
        }
    })

    return personOrders
}