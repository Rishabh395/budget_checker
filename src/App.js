import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import WelcomePage from "./core/WelcomePage";

function App() {
  return (
    <div>
    
      <BrowserRouter>
      {/* <WelcomePage/> */}
        <Routes>
          <Route  path="/" element={<WelcomePage/>} />
          <Route  path="/signup" element={<Signup/>} />
          <Route  path="/signin" element={<Signin/>} /> 
        {/* <PrivateRoutes path="/user/dashboard" exact component={Home} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
