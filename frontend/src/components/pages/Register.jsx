import React, { useState } from "react";
import { useMainContext } from "../store/Context";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Reader",
    password: "",
    avatar: "",
    avatarPreview: null,
  });

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setformData({
        ...formData,
        avatarPreview: reader.result,
        avatar: file,
      });
    };
  };

  const { Mode, isAuthenticated, setisAuthenticated } = useMainContext();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/createUser",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        setformData({
          name: "",
          email: "",
          phone: "",
          role: "",
          password: "",
          avatar: "",
          avatarPreview: "",
        });
        setisAuthenticated(true);
        toast.success(response.data.message);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
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
        <form onSubmit={handleRegister}>
          <h1>REGISTER</h1>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
            />
          </div>
          <div>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={EyeOpen ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div className="avatar">
              <img
                src={formData.avatarPreview ? `${formData.avatarPreview}` : ""}
                alt="avatar"
              />
            </div>

            <div>
              <input
                type="file"
                name="avatar"
                onChange={avatarHandler}
                className="avatar_input_tag"
                style={{ border: "none" }}
              />
            </div>
          </div>
          <p>
            Already Registered ? <Link to={"/login"}>Login Now </Link>
          </p>
          <button type="submit" className="submit-btn">
            REGISTER
          </button>
        </form>
      </section>
    </article>
  );
};

export default Register;
