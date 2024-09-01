import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaGitSquare } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { useMainContext } from "../store/Context";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  const isDashboard = useLocation("https://blog-frontend-2-dfm4.onrender.com/dashboard");
  const { Mode, setMode, User, setUser, isAuthenticated, setisAuthenticated } =
    useMainContext();

  return (
    <footer
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideFooter"
          : Mode === "light"
          ? "light-footer"
          : "dark-footer"
      }
    >
      <div className="container">
        <div className="about">
          <h3>About</h3>
          <p>
            Welcome to AI UPDATES! We’re passionate about sharing insights,
            stories, and tips on Artificial Intelligence. Join us as we explore
            new ideas, trends, and experiences. Your go-to destination for
            engaging and informative content!
          </p>
          <p>
            <span>Email:</span>mhrithik450@gmail.com
          </p>
          <p>
            <span>Phone:</span>7483229386
          </p>
        </div>
        <div className="quick_links">
          <h3>Quick Links</h3>
          <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/blogs"}>Blogs</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
          </ul>
        </div>
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li>Artificial Intelligence</li>
            <li>Robots</li>
            <li>Software</li>
            <li>Business</li>
            <li>Economy</li>
          </ul>
        </div>
        <div className="news_letter">
          <div>
            <h3>Weekly Newsletter</h3>
            <p>Get blog articles and offer via email</p>
          </div>
          <div>
            <input type="text" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="logo">
          AI <span>UPDATES</span>
          <Link
            to={"/about"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>Terms & Conditions</p>
          </Link>
        </div>
        <div>
          <div style={{ display: "flex", columnGap: "1rem" }}>
            <Link to={"#"} style={{ textDecoration: "none", color: "white" }}>
              AI UPDATES © All Rights Reserved
            </Link>

            <Link
              to={"/privacyPolicy"}
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
