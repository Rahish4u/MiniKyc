import React from 'react'
import KycForm from './Components/KycForm'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Components/Navbar';
import AdminDashboard from './Components/AdminDashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar/>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<KycForm />} />
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
