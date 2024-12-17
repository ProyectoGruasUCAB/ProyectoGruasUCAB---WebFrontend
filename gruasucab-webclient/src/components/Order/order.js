import React from "react";
import MapContainer from "../MapContainer/mapContainer";
import OrderBox from "./orderBox";
import OrderBar from "./orderBar";
import './orderBox.css'

function Orders() {


    const orders = [
        {id: 1, name: "Order1", description: "Descripcion de la orden 1"},
        {id: 2, name: "Order2", description: "Descripcion de la orden 2"}
    ];
    return (
        <div className="d-flex">
            <OrderBar />
            <div className="flex-grow-1 p-3">
                <h1>Ordenes</h1>
                <MapContainer/>
                <OrderBox orders={orders}/>
            </div>
        </div>
    )
}

export default Orders;