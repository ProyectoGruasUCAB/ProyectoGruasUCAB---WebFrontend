import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSupplier } from '../../api/apiSuplier'; // Asegúrate de tener esta función en tu API
import { setAuthToken } from '../../api/apiAuth'; // Asegúrate de tener esta función en tu API

const SupplierForm = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    type: 'Interno', // Valor por defecto
    userEmail: localStorage.getItem('userEmail'),
    userId: localStorage.getItem('userID')
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await setAuthToken(token);
      } else {
        setError('No hay token de autenticación disponible');
        return;
      }
      console.log(supplier)
      await createSupplier(supplier);
      alert('Proveedor agregado con éxito');
      navigate('/suppliers');
      setError(''); // Limpiar cualquier mensaje de error anterior
    } catch (error) {
      console.error('Error al agregar el proveedor:', error);
      setError('Error al agregar el proveedor, intenta de nuevo');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Ingresar datos del proveedor</h2>
        <div className="card shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="supplierName" className="form-label">Nombre de la empresa:</label>
              <input
                type="text"
                className="form-control"
                id="supplierName"
                name="name"
                value={supplier.name}
                onChange={handleSupplierChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="supplierType" className="form-label">Tipo:</label>
              <select
                className="form-control"
                id="supplierType"
                name="type"
                value={supplier.type}
                onChange={handleSupplierChange}
                required
              >
                <option value="Interno">Interno</option>
                <option value="Externo">Externo</option>
              </select>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='d-flex justify-content-center'>
              <button type="submit" className="btn btn-primary w-50">Agregar Proveedor</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;