import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({isLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // Adjusted regex for password validation

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be between 6 and 20 characters and contain at least one numeric digit, one uppercase, and one lowercase letter";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const userdata = {
      email,
      password,
    };

    try {
  
      const response = await axios.get("http://localhost:3000/register");
      const users = response.data; 

     
      const user = users.find((user) => user.email === userdata.email && user.password === userdata.password);

      if (user) {
        localStorage.setItem("token", JSON.stringify(user.token)); 
        navigate("/usertask");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login Failed";
      toast.error(errorMessage);
      console.log("Login Failed", err);
    }
  };

  return (
    <div className="container mt-5">
      {/* <ToastContainer /> */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 rounded">
            <h4 className="text-center mb-4">Login Page</h4>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`} 
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button onClick={handleSubmit} className="btn btn-primary w-100">
              Login
            </button>
            <div className="mt-3 text-center">
              <p>
                Do not have an account?{" "}
                <button className="btn btn-link" onClick={() => navigate("/")}>
                  Registration
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
