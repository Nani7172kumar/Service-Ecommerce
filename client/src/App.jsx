import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import AdminDashboard from './pages/AdminDashboard'
import VendorDashboard from './pages/VendorDashboard'

const getRole = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.role
}

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" />
  if (role && getRole() !== role) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking/:id" element={
          <PrivateRoute><Booking /></PrivateRoute>
        }/>
        <Route path="/my-bookings" element={
          <PrivateRoute><MyBookings /></PrivateRoute>
        }/>
        <Route path="/admin" element={
          <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>
        }/>
        <Route path="/vendor" element={
          <PrivateRoute role="vendor"><VendorDashboard /></PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}