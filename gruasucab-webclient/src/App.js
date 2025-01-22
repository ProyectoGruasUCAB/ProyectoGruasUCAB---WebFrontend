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
import Services from './components/RoadServices/roadservices';
import Department from './components/Department/department';
import Notification from './components/Notifications/notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/User/Login/login';
import AddUser from './components/User/AddUser/addUser';
import EditUser from './components/User/EditUser/editUser';
import UserProfile from './components/User/UserProfile/userProfile';
import { logout } from './api/apiAuth';
import UserDetail from './components/User/userDetail';
import { UserProvider } from './components/User/Login/UserContext'; 
import UserForm from './components/User/AddUser/UserForm';
import OrderDetails from './components/Order/OrderDetails';
import VehicleDetail from './components/Vehicle/vehicleDetail';
import EditVehicle from './components/Vehicle/editVehicle';
import SupplierForm from './components/Suplier/supplierForm';
import Provider from './components/Providers/Providers';
import AddServiceFee from './components/RoadServices/addServiceFee';
import AddDepartment from './components/Department/AddDepartment';
import DepartmentDetail from './components/Department/DepartmentDetail';
import AddVehicle from './components/Vehicle/addVehicle';
import EditDepartment from './components/Department/editDeartment';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  const handleLogin = (user) => {
    if (user.role === 'Conductor') {
      alert("Los conductores no pueden acceder a la aplicacion web.")
      handleLogout();
    } else {
    setIsLoggedIn(true);
    setUserRole(user.role);
}};

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
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    
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
                    <Route path="/providers" element={<Suplier />} />
                    <Route path="/suppliers" element={<Provider />} />
                    <Route path="/drivers" element={<Driver />} />
                    <Route path="/customers" element={<Customer />} />
                    <Route path="/vehicles" element={<Vehicle />} />
                    <Route path="/vehicle/:id" element={<VehicleDetail />} />
                    <Route path="/editVehicle/:id" element={<EditVehicle />} />
                    <Route path="/servicios" element={<Services />} />
                    <Route path="/departments" element={<Department />} />
                    <Route path="/notifications" element={<Notification />} />
                    <Route path="/Login" element={<LoginForm onLogin={handleLogin} onLogout={handleLogout}/>} />
                    <Route path='/users/:role/:id' element={<UserDetail />} />
                    <Route path="/addUser/:role" element={<AddUser />} />
                    <Route path="/user-form" element={<UserForm />} />
                    <Route path="/editUser/:role/:id" element={<EditUser />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/supplier-form" element={<SupplierForm />} />
                    <Route path="/addServiceFee/" element={<AddServiceFee />} />
                    <Route path="/addDepartment/" element={<AddDepartment />} />
                    <Route path="addVehicle" element={<AddVehicle />} />
                    <Route path="/department/:id" element={<DepartmentDetail />} />
                    <Route path="/editDepartment/:id" element={<EditDepartment />} />
                    <Route path="/order-detail/:orderId" element={<OrderDetails />} />
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
