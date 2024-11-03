import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Form, FormControl, ListGroup, Container, Row, Col } from 'react-bootstrap';
import './showListCustom.css';
import { useNavigate } from "react-router-dom";

function ShowList({ title, initialItems }) {
    const [items] = useState(initialItems);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    const handleEdit = (id) => {
        console.log('Edit ' + title + ' with id:' + id);
    }

    const handleDelete = (id) => {
        console.log(items.filter(item => item.id === id));
    }

    const handleAddSupplier = () => {
        navigate('/add' + title);
    }

    return (
        <Container>
            <Row className="my-4 align-items-center">
                <Col xs="auto">
                    <h1>{title}</h1>
                </Col>
                <Col xs="auto">
                    <Button className="btn-primario" onClick={handleAddSupplier}>Agregar {title}</Button>
                </Col>
                <Col xs='auto ms-auto d-flex'>
                    <Form className="d-flex">
                        <FormControl
                            type="text"
                            placeholder="Buscar ..."
                            className="me-2 form-control-operator"
                            style={{ width: '400px' }}
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <Button className="btn-buscar">Buscar</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {filteredItems.map((item, index) => (
                            <ListGroup.Item
                                key={item.id}
                                className={index % 2 === 0 ? 'bg-light' : 'bg-white'}
                            >
                                <Row>
                                    <Col>{item.name}</Col>
                                    <Col className="text-end">
                                        <Button variant="warning" className="ms-2" onClick={() => handleEdit(item.id)}>Editar</Button>
                                        <Button variant="danger" className="ms-2" onClick={() => handleDelete(item.id)}>Eliminar</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

// Validación de props
ShowList.propTypes = {
    title: PropTypes.string.isRequired,
    initialItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
};

export default ShowList;
