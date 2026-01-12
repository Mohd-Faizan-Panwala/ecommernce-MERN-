import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminMiddleware = () => {
    const isAuthenticated = !!localStorage.getItem("adminToken","token")
  return isAuthenticated? <Outlet/> :<Navigate to="/admin/login" replace/>
}

export default AdminMiddleware