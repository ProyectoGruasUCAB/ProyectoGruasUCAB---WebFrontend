import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/UI/Header';
import Sidebar from './components/UI/Sidebar';
import Orders from './components/Order/order';
import Operator from './components/Operator/operator';
import Suplier from './components/Suplier/suplier';
import Driver from './components/Driver/driver';
import Customer from './components/Customer/customer';
import Vehicle from './components/Vehicle/vehicle';
import Policies from './components/Policies/policies';
import Servicios from './components/RoadServices/roadservices';
import Department from './components/Department/department';
import Notification from './components/Notifications/notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/User/Login/login';
import AddUser from './components/User/AddUser/addUser';
import EditUser from './components/User/EditUser/editUser';
import UserProfile from './components/User/UserProfile/userProfile';
import { login, logout } from './api/api'; // Asegúrate de ajustar la ruta a tu api.js
import UserDetail from './components/User/userDetail';
import { UserProvider } from './components/User/Login/UserContext'; // Importa el UserProvider

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserRole(user.role);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserRole(user.role);
    setUserEmail(user.email);
  };

  const handleLogout = async () => {
    const userEmail = localStorage.getItem('userEmail');
    const refreshToken = localStorage.getItem('refreshToken');

    if (userEmail && refreshToken) {
      try {
        await logout(userEmail, refreshToken);
      } catch (error) {
        console.error('Error al cerrar sesión', error);
      }
    }

    setIsLoggedIn(false);
    setUserRole('');
    setUserEmail('');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
  };

  const getUserData = async (id) => {
    try {
      const response = await login(`/users/${id}`); // Suponiendo que `login` es la función correcta o cambiando al endpoint correcto
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await login.put(`/users/${id}`, userData); // Suponiendo que `login.put` es la función correcta o cambiando al método correcto
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <UserProvider>
      <Router>
        <div className="App">
          {isLoggedIn ? (
            <div>
              <Header onLogout={handleLogout} />
              <div className="App-body d-flex">
                <Sidebar role={userRole} />
                <div className="content">
                  <Routes>
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/operators" element={<Operator />} />
                    <Route path="/supliers" element={<Suplier />} />
                    <Route path="/drivers" element={<Driver />} />
                    <Route path="/customers" element={<Customer />} />
                    <Route path="/vehicles" element={<Vehicle />} />
                    <Route path="/policies" element={<Policies />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/departments" element={<Department />} />
                    <Route path="/notifications" element={<Notification />} />
                    <Route path="/Login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path='/users/:role/:id' element={<UserDetail />} />
                    <Route path="/addUser/:role" element={<AddUser />} />
                    <Route path="/editUser/:role/:id" element={<EditUser getUserData={getUserData} updateUser={updateUser} />} />
                    <Route path="*" element={<Navigate to="/orders" replace />} />
                    <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                </div>
              </div>
            </div>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
