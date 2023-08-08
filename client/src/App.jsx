import React from 'react'
import Sidenav from './component/Sidenav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Income from './pages/Income';
import Withdraw from './pages/Withdraw';
import Logout from './pages/Logout';

const App = () => {
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/registration" element={<Registration/>}/>
      <Route exact path="/forgetpassword" element={<ForgetPassword/>}/>
      <Route exact path="/resetpassword/:id/:token" element={<ResetPassword/>}/>
      
      <Route exact path="/withdraw" element={<Withdraw/>}/>
      <Route exact path="/income" element={<Income/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
    </Routes>
    </>
  )
}

export default App