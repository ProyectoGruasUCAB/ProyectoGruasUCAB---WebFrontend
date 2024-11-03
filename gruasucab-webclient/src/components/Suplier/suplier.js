import React from "react";
import ShowList from "../UI/showList";


const initialItems = [
    { id: 1, name: "Proveedor 1"} ,
    { id: 3, name: "Proveedor 3"} ,
    { id: 4, name: "Proveedor 4"} ,
    { id: 2, name: "Proveedor 2"} ,
    { id: 5, name: "Proveedor 5"} ,
];

function Suplier() {
    return (
        <div>
            <ShowList title = "Proveeores" initialItems={initialItems}/>
        </div>
    );
}

export default Suplier;