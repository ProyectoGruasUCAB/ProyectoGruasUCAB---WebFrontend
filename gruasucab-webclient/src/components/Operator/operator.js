import React from "react";
import ShowList from "../UI/showList";

const initialItems = [
    { id: 1, name: "Operador 1"} ,
    { id: 3, name: "Operador 3"} ,
    { id: 4, name: "Operador 4"} ,
    { id: 2, name: "Operador 2"} ,
    { id: 5, name: "Operador 5"} ,
];

function Operator() {
    return (
        <div>
            <ShowList title="Operadores" role="Trabajador" initialItems={initialItems} />
        </div>
    );
}

export default Operator;
