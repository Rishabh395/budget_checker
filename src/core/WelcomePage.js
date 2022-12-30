import React from "react";
import Base from "./Base";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
     <Base title="Welcome"> 
      <div >
        <div >
          Welcome to Budget Tracker
        </div>
        <div>
          <div  >
            Hi, Welcome to the Budget Tracker App
            <br /> Glad to see you here. <br />
            This app will help you keep track of your daily budget. <br />
          </div>
          <div >
            LETS GET STARTED
          </div>
          <div>
            <Link to="/signin" >
           <button>LOGIN</button>
            </Link>
            <Link to="/signup">
            <button>Register</button>
            </Link>
          </div>
        </div> 
        
      </div>
    </Base> 
  
  );
};
export default WelcomePage;
