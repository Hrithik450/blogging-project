import React from "react";
import { useMainContext } from "../store/Context";
import LatestBlog from "../minicomponents/LatestBlog";

const AllBlogs = () => {
  const { Mode, isAuthenticated, Blogs } = useMainContext();
  return (
    <article className={Mode === "dark" ? "dark-bg" : "light-bg"}>
      <LatestBlog Blogs={Blogs} title={"Blogs"} />
    </article>
  );
};

export default AllBlogs;
