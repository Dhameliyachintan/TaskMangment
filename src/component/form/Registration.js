import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to validate registration form
  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Invalid name format";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be between 6 and 20 characters and contain at least one numeric digit, one uppercase, and one lowercase letter";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    axios
      .post("http://localhost:3000/register", formData)
      .then((res) => {
        const { access_token } = res.data;
        localStorage.setItem("token", access_token);
        toast.success("Registration successful");
        navigate("/login");
        console.log("Registration successful", res);
      })
      .catch((err) => {
        alert("Registration failed");
        console.log("Registration error", err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">
          <h2>Registration Form</h2>
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
            <div className="mt-3 text-center">
              <p>
                Already have an account?{" "}
                <button
                  className="btn btn-link"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
