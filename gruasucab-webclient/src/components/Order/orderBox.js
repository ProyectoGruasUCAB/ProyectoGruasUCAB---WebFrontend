import React from "react";
import './orderBox.css';

function OrderBox({orders}) {
    return(
        <div className="orders-container">
            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <h3>{order.name}</h3>
                    <p>{order.description}</p>
                </div>
            ))}
        </div>
    )
}
/*
OrderBox.propTypes = {
    orders: PropTypes.func.isRequired,
  };*/

export default OrderBox;