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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserRole(user.role);
      setUserName(user.email);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserRole(user.role);
    setUserName(user.email); // Usamos el email como nombre de usuario por simplicidad
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
    localStorage.removeItem('user'); // Elimina la información del usuario de localStorage
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <div>
            <Header userName={userName} onLogout={handleLogout} />
            <div className="App-body d-flex">
              <Sidebar role={userRole} />
              <div className="content">
                <Routes>
                  <Route path="/orders" element={<Orders/>} />
                  <Route path="/operators" element={<Operator/>} />
                  <Route path="/supliers" element={<Suplier/>} />
                  <Route path="/drivers" element={<Driver/>} />
                  <Route path="/customers" element={<Customer/>} />
                  <Route path="/vehicles" element={<Vehicle/>} />
                  <Route path="/policies" element={<Policies/>} />
                  <Route path="/servicios" element={<Servicios/>} />
                  <Route path="/departments" element={<Department/>} />
                  <Route path="/notifications" element={<Notification/>} />
                  <Route path="/Login" element={<LoginForm onLogin={handleLogin} />} />
                  <Route path="/addUser/:role" element={<AddUser />} />
                  <Route path="*" element={<Navigate to="/orders" replace/>} />
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
