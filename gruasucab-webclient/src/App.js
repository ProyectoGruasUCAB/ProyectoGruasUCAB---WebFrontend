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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserEmail('');
    localStorage.removeItem('user');
  };


const getUserData = async (id) => {
    // Simulación de una llamada a la API
    const response = await fetch(`https://api.example.com/users/${id}`);
    const data = await response.json();
    return data;
};

const updateUser = async (id, userData) => {
    // Simulación de una llamada a la API
    await fetch(`https://api.example.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
};


  return (
      <Router>
        <div className="App">
          {isLoggedIn ? (
            <div>
              <Header userName={userEmail} onLogout={handleLogout} />
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
                    <Route path="/addUser/:role" element={<AddUser />} />
                    <Route path="/editUser/:role/:id" element={<EditUser getUserData={getUserData} updateUser={updateUser} />} />
                    <Route path="*" element={<Navigate to="/orders" replace />} />
                    <Route path="/profile" element={<UserProfile/>}/>
                  </Routes>
                </div>
              </div>
            </div>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </div>
      </Router>
  );
}

export default App;
