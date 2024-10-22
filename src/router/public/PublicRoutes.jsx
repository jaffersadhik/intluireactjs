import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Signin from '../../publicpages/signin/Signin';
// import Login from '../../pages/login/Login'
// import Signup from '../../pages/signin/Signup';
// import Test from '../../pages/Test';
// import ForgotPassword from '../../pages/forgotpassword/ForgotPassword';

function PublicRoutes() {
  return (
    <div>
       <Routes>
          <Route exact  path="/" element={ <Signin/> }></Route>
          {/* <Route exact  path="/signup" element={ <Signup/> }></Route>
          <Route exact  path="/test" element={ <Test/> }></Route>
          <Route exact  path="/forgotPassword" element={ <ForgotPassword/> }></Route> */}


          
         
        </Routes>
    </div>
  )
}

export default PublicRoutes
