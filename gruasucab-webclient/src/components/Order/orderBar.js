import React from 'react';
import { Nav } from 'react-bootstrap';
import './orderBox.css'
function OrderBar() {
    return (
        <div className='order-bar'>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/home">Ordenes en progreso</Nav.Link>
                <Nav.Link href="/servicios">Ordenes completadas</Nav.Link>
            </Nav>
        </div>
    )
}

export default OrderBar;