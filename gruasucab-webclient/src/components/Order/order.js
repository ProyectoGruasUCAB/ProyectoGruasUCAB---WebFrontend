import React from "react";
import MapContainer from "../MapContainer/mapContainer";
import OrderBox from "./orderBox";
import OrderBar from "./orderBar";
import './orderBox.css'

function Orders() {

    const whatsappLocationUrl = "https://maps.google.com/maps?q=10.445251%2C-66.8032893&z=17&hl=es"

    const orders = [
        {id: 1, name: "Order1", description: "Descripcion de la orden 1"},
        {id: 2, name: "Order2", description: "Descripcion de la orden 2"}
    ];
    return (
        <div className="d-flex">
            <OrderBar />
            <div className="flex-grow-1 p-3">
                <h1>Ordenes</h1>
                <MapContainer locationUrl={whatsappLocationUrl} />
                <OrderBox orders={orders}/>
            </div>
        </div>
    )
}

export default Orders;