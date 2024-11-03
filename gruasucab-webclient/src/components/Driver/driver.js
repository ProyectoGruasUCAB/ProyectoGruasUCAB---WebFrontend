import React from "react";
import ShowList from "../UI/showList";

const initialItems = [
    { id: 1, name: "Conductor 1"} ,
    { id: 3, name: "Conductor 3"} ,
    { id: 4, name: "Conductor 4"} ,
    { id: 2, name: "Conductor 2"} ,
    { id: 5, name: "Conductor 5"} ,
];

function Driver() {
    return (
        <div>
            <ShowList title = "Conductores" initialItems={initialItems}/>
        </div>
    );
}

export default Driver;