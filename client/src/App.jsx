import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Public from './pages/Public'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

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
        <Route path="/" element={<div><h1>PortfolioHostfy</h1><p>Learn and host simple portfolios.</p></div>} />
        <Route path="/public" element={<Public />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}
