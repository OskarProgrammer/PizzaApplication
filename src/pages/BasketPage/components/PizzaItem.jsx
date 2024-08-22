import "./PizzaItem.css"

export const PizzaItem = (props) => {
    return (
        <div className="pizza">
            <h3>{props.pizzaInfo.name}</h3>
            <p>Price: {props.pizzaInfo.price}</p>
            <p>Size: {props.pizzaInfo.size}</p>
            <button onClick={() => (props.onRemove(props.pizzaInfo.universalId))}>Remove this pizza</button>
        </div>
    )
}