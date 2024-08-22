import { useLoaderData, Link, redirect} from "react-router-dom"
import { fetchDataFromEndpoint } from "../../API functions/functions"
import "./OrdersList.css"
import { useState } from "react"

export const OrdersList = () => {
    const orders = useLoaderData()
    let [ordersData, setOrdersData] = useState(orders)

    const changeStatus = async (newStatus, orderInfo) => {
        let newOrders = []

        ordersData.map((order)=>{
            if (order.universalOrderId == orderInfo.universalOrderId){
                order.status = newStatus
            }
            newOrders.push(order)
        })

        ordersData = newOrders
        setOrdersData(ordersData)

        let newOrderContent = {
            status: newStatus
        }

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrderContent)
        }

        try {
            await fetch(`http://localhost:3000/orders?universalOrderId="${orderInfo.universalOrderId}"`,requestOptions)
        }catch {
            throw Error("Can not put informations into the database")
        }

        return redirect(".")
    }

    const removeOrder = async (orderInfo) => {
        let newOrders = []

        ordersData.map((order)=>{
            if (order.universalOrderId != orderInfo.universalOrderId) {
                newOrders.push(order)
            }
        })

        ordersData = newOrders
        setOrdersData(ordersData)

        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }
        try {
            await axios(`http://localhost:3000/orders?universalOrderId="${orderInfo.universalOrderId}"`,requestOptions)
            // await fetch(`http://localhost:3000/orders?universalOrderId="${orderInfo.universalOrderId}"`,requestOptions)
        }catch {
            throw Error("Can not delete the order")
        }

        return redirect(".")
    }

    return(
        <div className="ordersList">
            <h1>Orders List</h1>
            {ordersData.map((order)=>(
                <div className="orderItem">
                    <Link to={`/${order.universalOrderId}`}>
                        <h3>
                            <p>Order with key :</p>
                            <p>{order.universalOrderId}</p>
                        </h3>
                        <p>Pizzas: {order.pizzas.length}</p>
                        <p>Status: {order.status}</p>
                        <br />
                        <h3>
                            Delivery Informations:
                        </h3>
                        <p>City: {order.city}</p>
                        <p>Zip Code: {order.zipCode}</p>
                        <p>Street: {order.street}</p>
                    </Link>
                    <button onClick={()=>{changeStatus("Making",order)}}>Making</button>
                    <button onClick={()=>{changeStatus("Ready",order)}}>Ready</button>
                    <button onClick={()=>{removeOrder(order)}}>Remove</button>
                </div>
            ))}
        </div>
    )
}

export const ordersListLoader = async() => {
    const orders = await fetchDataFromEndpoint("http://localhost:3000/orders")

    return orders
} 