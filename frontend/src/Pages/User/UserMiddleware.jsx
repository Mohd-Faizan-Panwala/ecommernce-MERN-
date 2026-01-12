import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserMiddleware = () => {
    const isAuthenticated = !!localStorage.getItem("token","token")
  return isAuthenticated? <Outlet/> :<Navigate to="/" replace/>
}

export default UserMiddleware