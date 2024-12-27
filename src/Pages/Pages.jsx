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
         
          <Route path="/" element={<Services />} />
          <Route path="/admin/add-service" element={<AddService />} />
          <Route path="/admin/edit-service/:id" element={<EditService />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/add-booking" element={<AddBooking />} />
          <Route path="/admin/edit-booking/:id" element={<EditBooking />} />         
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default pages;