import React, { useState } from "react";
import { useMainContext } from "../store/Context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { Mode, isAuthenticated, setisAuthenticated } = useMainContext();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/loginUser",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setformData({
          email: "",
          password: "",
        });
        setisAuthenticated(true);
        toast.success(response.data.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <article className={Mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
            />
          </div>
          <p>
            Don't have a account ? <Link to={"/register"}>Register Now </Link>
          </p>
          <button type="submit" className="submit-btn">
            LOGIN
          </button>
        </form>
      </section>
    </article>
  );
};

export default Login;
