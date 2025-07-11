import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Error from './Pages/Error.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Products from './Pages/Products.jsx'
import Profile from './Pages/Profile.jsx'
import Navbar from './Components/Navbar.jsx'
import Cursor from './Components/Cursor.jsx'

const App = () => {
  return (
    <>
    <Navbar/>
    <Cursor/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path='*' element ={<Error/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/signup' element ={<SignUp/>}/>
      <Route path='/profile' element ={<Profile/>}/>
      <Route path='/products' element ={<Products/>}/>
    </Routes>
    </>
  )
}

export default App
