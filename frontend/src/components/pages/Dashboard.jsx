import React, { useState } from "react";
import { useMainContext } from "../store/Context";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import MyProfile from "../minicomponents/MyProfile";
import CreateBlog from "../minicomponents/CreateBlog";
import Chart from "../minicomponents/Chart";
import MyBlogs from "../minicomponents/MyBlogs";

const Dashboard = () => {
  const { Mode, isAuthenticated, User } = useMainContext();
  const [component, setcomponent] = useState();

  if (!isAuthenticated || User.role === "Reader") {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={Mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setcomponent={setcomponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Chart" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
