import React from "react";
import { Link } from "react-router-dom";
import useHistory from "react-dom"
import { signout } from "../auth";



export default function Navbar() {
  let history = useHistory();
  return (
    <div>
      <div >
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
      </div>
      <div>
          <div>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <button >Login</button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button>
                Register
              </button>
            </Link>
          </div>
        
      </div>
    </div>
  );
}
