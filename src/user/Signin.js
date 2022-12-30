import React, { useState } from "react";
import Base from "../core/Base";
import { Link} from "react-router-dom";
import { redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth";



const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const {
    name,
    email,
    password,
    error,
    success,
    loading,
    didRedirect,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        
        if (data.token) {
          authenticate(data, () => {
          
            setValues({
              ...values,
              didRedirect: true,
             
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      console.log("rishabh")
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div style={{ display: success ? "" : "none" }}>
        <p>
          New Account Created. Please <Link to="/signin"> Login </Link>{" "}
        </p>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <p>Check all fields again.</p>
      </div>
    );
  };

  const signinForm = () => {
    return (
      // <form>
      <div>
        <div>
          Sign In
        </div>
        {loadingMessage()}
        {errorMessage()}

        <form>
        <br/>
          <h3>email</h3>
          <input
            type="email"
            label="Email"
            value={email}
            
            onChange={handleChange("email")}
          />
           <br/>
          <h3>password</h3>
          <input
            
            type="password"
            label="Password"
            value={password}
            
            onChange={handleChange("password")}
          />
          <button onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <Base title="Welcome to Sign In Page">
      {signinForm()}
      
      {performRedirect()}
    </Base>
  );
};
export default Signin;
