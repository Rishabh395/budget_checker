import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";


const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const {  username, email, password, error, success, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({    username, email, password })
      .then((data) => {
        console.log(data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            loading: false,
          });
        } else {
          setValues({ ...values, error: true, success: false });
        }
      })
      .catch((e) => console.log(e));
  };

  const successMessage = () => {
    return (
      <div>
        <div>
          New Account Created. Please{" "}
          <Link
            to="/signin" >
         
            Login
          </Link>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <div
          style={{
            color: "#e53935",
          }}
        >
          Check all fields again.
        </div>
      </div>
    );
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

  const signupForm = () => {
    return (
      <div>
        <div>
          Sign Up
        </div>
        {loadingMessage()}
        {errorMessage()}
        {successMessage()}
        <form>
          <h3>name</h3>
          <input
            
            type="text"
            label="Name"
            value={username}
            onChange={handleChange("username")}
          />
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
              <br/>
          <button onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page">
     
      {signupForm()}
   
    </Base>
  );
};
export default Signup;
