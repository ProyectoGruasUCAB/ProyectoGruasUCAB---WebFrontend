import React, {useState} from 'react';
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
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginForm from './components/User/Login/login';
import AddOperator from './components/Operator/addOpeator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <div>
            <Header />
            <div className="App-body d-flex">
              <Sidebar />
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
                  <Route path="/Login" element={<LoginForm/>} />
                  <Route path="/addOperator" element={<AddOperator/>} />
                  <Route path="*" element={<Navigate to="/orders" replace/>} />
                </Routes>  
              </div>
            </div>
          </div>
        ):(
        <LoginForm onLogin={handleLogin} />
      )}
      </div>
    </Router>
  );
}

export default App;
