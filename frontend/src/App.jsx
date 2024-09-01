import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import SingleBlog from "./components/pages/SBlog";
import About from "./components/pages/About";
import Authors from "./components/pages/Authors";
import Dashboard from "./components/pages/Dashboard";
import UpdateBlog from "./components/pages/updateBlog";
import Footer from "./components/layout/Footer";
import { useMainContext } from "./components/store/Context";
import { useEffect } from "react";
import axios from "axios";
import AllBlogs from "./components/pages/Blogs";
import { Toaster } from "react-hot-toast";
import Privacy from "./components/pages/Privacy";

function App() {
  const {
    User,
    setUser,
    isAuthenticated,
    setisAuthenticated,
    Blogs,
    setBlogs,
  } = useMainContext();

  useEffect(() => {
    const FetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/user/me",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUser(response.data.User);
          setisAuthenticated(true);
        }
      } catch (error) {
        setisAuthenticated(false);
        setUser({});
      }
    };

    const FetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/blog/getblogs",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBlogs(response.data.Blogs);
        }
      } catch (error) {
        setBlogs([]);
      }
    };

    FetchUser();
    FetchBlogs();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacyPolicy" element={<Privacy />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
