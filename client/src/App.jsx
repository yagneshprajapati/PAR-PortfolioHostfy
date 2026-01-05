import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Public from './pages/Public'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import Home from './pages/Home'
import Details from './pages/Details'

export default function App(){
  return (
    <div style={{padding:20}}>
      <nav style={{display:'flex',gap:12,marginBottom:20}}>
        <Link to="/">Home</Link>
        <Link to="/public">Public</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/public" element={<Public />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio/:id" element={<Details />} />
      </Routes>
    </div>
  )
}
