import React, { StrictMode, useState } from "react";
import { useMainContext } from "../store/Context";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import toast from "react-hot-toast";

const SideBar = ({ component, setcomponent }) => {
  const { Mode, setMode, isAuthenticated, setisAuthenticated, User } =
    useMainContext();
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/user/logout",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setisAuthenticated(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleComponent = (value) => {
    setcomponent(value);
  };

  return (
    <>
      <div className="icon-wrapper" onClick={() => setshow(!show)}>
        <GiHamburgerMenu />
      </div>

      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setshow(!show)}>
          <FaArrowLeft />
        </div>
        <div className="user-detail">
          <img src={User && User.avatar.url} alt="avatar" />
          <p>{User.name}</p>
        </div>
        <ul>
          <button onClick={() => setcomponent("My Blogs")}>My Blogs</button>
          <button onClick={() => setcomponent("Create Blog")}>
            Create Blog
          </button>
          <button onClick={() => setcomponent("Chart")}>Chart</button>
          <button onClick={() => setcomponent("My Profile")}>My Profile</button>
          <button onClick={goToHome}>Home</button>
          <button onClick={handleLogout}>Logout</button>
          <button
            onClick={() =>
              Mode === "light" ? setMode("dark") : setMode("light")
            }
            className={
              Mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
            }
          >
            {Mode === "light" ? (
              <CiLight style={{ color: "black" }} />
            ) : (
              <MdDarkMode />
            )}
          </button>
        </ul>
      </section>
    </>
  );
};

export default SideBar;
