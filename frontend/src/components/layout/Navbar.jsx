import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useMainContext } from "../store/Context";
import { toast } from "react-hot-toast";
import axios from "axios";

function Navbar() {
  const [show, setshow] = useState(false);

  const handleNavbar = () => {
    setshow(!show);
  };

  const isDashboard = useLocation("http://localhost:5173/dashboard");

  const { Mode, setMode, User, setUser, isAuthenticated, setisAuthenticated } =
    useMainContext();

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

  return (
    <section
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideNavbar"
          : Mode === "light"
          ? "header light-navbar"
          : "header dark-navbar"
      }
    >
      <nav>
        <div className="logo">
          AI<span>UPDATES</span>
        </div>
        <div className={show ? "links show" : "links"}>
          <ul>
            <li>
              <Link to={"/"} onClick={handleNavbar}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/blogs"} onClick={handleNavbar}>
                Blogs
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={handleNavbar}>
                Authors
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={handleNavbar}>
                About
              </Link>
            </li>
          </ul>

          <div className="btns">
            <button
              onClick={() =>
                Mode === "light" ? setMode("dark") : setMode("light")
              }
              className={
                Mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
              }
            >
              {Mode === "light" ? (
                <CiLight className="light-icon" />
              ) : (
                <MdDarkMode className="dark-icon" />
              )}
            </button>
            {isAuthenticated && User.role === "Author" && (
              <Link
                to={"/dashboard"}
                onClick={handleNavbar}
                className="dashboard-btn"
              >
                DASHBOARD
              </Link>
            )}

            {isAuthenticated ? (
              <button onClick={handleLogout} className="logout-btn">
                LOGOUT
              </button>
            ) : (
              <Link to={"/login"} onClick={handleNavbar} className="login-btn">
                LOGIN
              </Link>
            )}
          </div>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </section>
  );
}

export default Navbar;
