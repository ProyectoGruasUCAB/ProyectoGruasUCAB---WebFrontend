import React from "react";
import ShowList from "../UI/showList";

const initialItems = [
    { id: 1, name: "Cliente 1"} ,
    { id: 3, name: "Cliente 3"} ,
    { id: 4, name: "Cliente 4"} ,
    { id: 2, name: "Cliente 2"} ,
    { id: 5, name: "Cliente 5"} ,
];

function Customer() {
    return (
        <div>
            <ShowList title = "Clientes" initialItems={initialItems}/>
        </div>
    );
}

export default Customer;