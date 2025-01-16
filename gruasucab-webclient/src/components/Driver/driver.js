import React, { useState, useEffect } from "react";
import ShowList from "../UI/showList";
import { getAllDrivers } from "../../api/api";



function Driver() {

    const [drivers, setDrivers] = useState([]);
    const role = "Conductor";

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const driverData = await getAllDrivers();
                setDrivers(driverData);
            } catch (error) {
                console.error("Error fetching drivers", error);
            }
        };
        fetchDrivers();
    }, []);

    return (
        <div>
            <ShowList title = "Conductores" role={role} initialItems={drivers}/>
        </div>
    );
}

export default Driver;