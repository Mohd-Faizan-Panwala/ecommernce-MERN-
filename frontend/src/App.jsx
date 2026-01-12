import { useState } from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import './App.css'

import AdminLogin from './Pages/Admin/Login'
import AdminMiddleware from './Pages/Admin/AdminMiddleware'
import Orders from './Pages/Admin/Orders'
import Dashboard from './Pages/Admin/Dashboard'
import Products from './Pages/Admin/Products'


import Signup from './Pages/User/Signup'
import Login from './Pages/User/Login'
import Home from './Pages/User/Home'
import UserMiddleware from './Pages/User/UserMiddleware'
import PlaceOrders from './Pages/User/PlaceOrders'
import MyOrders from './Pages/User/MyOrders'
import UserProducts from './Pages/User/UserProducts'
import PlaceOrder from './Pages/User/PlaceOrders';


function App() {
  // const [count, setCount] = useState(0)

  return (
      <>
       <Toaster position="top-center" toastOptions={{duration: 3000, style: {borderRadius: "10px",background: "#333",color: "#fff", }, }}/>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/' element={<Login/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route element={<AdminMiddleware/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/orders' element={<Orders/>}/>
          <Route path='/admin/products' element={<Products/>}/>
        </Route>
        <Route element={<UserMiddleware/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/products' element={<UserProducts/>}/>
          <Route path='/orders' element={<PlaceOrder/>}/>
        </Route>
      </Routes>
      </BrowserRouter> 
      </>
   )
}

export default App
