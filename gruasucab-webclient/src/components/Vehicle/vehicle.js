import React from "react";
import ShowList from "../UI/showList";

const initialItems = [
    { id: 1, name: "Vehiculo 1"} ,
    { id: 3, name: "Vehiculo 3"} ,
    { id: 4, name: "Vehiculo 4"} ,
    { id: 2, name: "Vehiculo 2"} ,
    { id: 5, name: "Vehiculo 5"} ,
];

function Vehicle() {
    return (
        <div>
            <ShowList title = "Vehiculos" role="Vehiculo" initialItems={initialItems}/>
        </div>
    );
}

export default Vehicle;