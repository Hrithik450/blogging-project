import React, { useState } from "react";
import { useMainContext } from "../store/Context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import LoadingSpinner from "../minicomponents/spinner";

const Login = () => {
  const [spinner, setspinner] = useState(false);
  const navigate = useNavigate();
  const { Mode, isAuthenticated, setisAuthenticated } = useMainContext();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    setspinner(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://blog-backend-c8by.onrender.com/api/v1/user/loginUser",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setspinner(false);
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

  const [EyeOpen, setEyeOpen] = useState(true);

  const handlePassword = () => {
    setEyeOpen(!EyeOpen);
  };

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

          <div style={{ position: "relative" }}>
            <input
              type={EyeOpen ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
            />
            {EyeOpen ? (
              <FiEye
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  transform: "translateY(-50%)",
                }}
                onClick={handlePassword}
              />
            ) : (
              <FiEyeOff
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  transform: "translateY(-50%)",
                }}
                onClick={handlePassword}
              />
            )}
          </div>
          <p>
            Don't have a account ? <Link to={"/register"}>Register Now </Link>
          </p>
          <button type="submit" className="submit-btn">
            {spinner ? <LoadingSpinner /> : <> LOGIN</>}
          </button>
        </form>
      </section>
    </article>
  );
};

export default Login;
