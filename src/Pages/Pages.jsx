import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/auth/Login";
import Dashboard from "./Dashboard Pages/dashboard/Dashboard";
import Protected from "../Components/Common/Protected";
import AddUser from "../Pages/Dashboard Pages/Add User/AddUser";
import AllUsers from "./Dashboard Pages/all users/AllUsers";
import Services from "./Dashboard Pages/services/Services";
import AddService from "./Dashboard Pages/services/AddService";
import Bookings from "./Dashboard Pages/bookings/Bookings";
import AddBooking from "./Dashboard Pages/bookings/AddBooking";
import ProtectedRoute from "../Components/protectedRoute/ProtectedRoute";
import EditService from "./Dashboard Pages/services/EditService";
import EditBooking from "./Dashboard Pages/bookings/EditBooking";
const pages = () => {
  return (
    <div className="pages">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Protected Cmp={Login} />} />
          
         
          <Route path="/admin/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/admin/add-service" element={<ProtectedRoute><AddService /></ProtectedRoute>} />
          <Route path="/admin/edit-service/:id" element={<ProtectedRoute><EditService /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/admin/add-booking" element={<ProtectedRoute><AddBooking /></ProtectedRoute>} />
          <Route path="/admin/edit-booking/:id" element={<ProtectedRoute><EditBooking /></ProtectedRoute>} />         
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default pages;