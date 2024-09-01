import React from "react";
import { useMainContext } from "../store/Context";
import HeroSection from "../minicomponents/HeroSection";
import TrendingBlogs from "../minicomponents/TrendingBlogs";
import LatestBlog from "../minicomponents/LatestBlog";
import Authors from "../minicomponents/Authors";

const Home = () => {
  const { Mode, setMode, Blogs } = useMainContext();
  const filterBlogs = Blogs.slice(0, 6);

  return (
    <article className={Mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection />
      <TrendingBlogs />
      <LatestBlog Blogs={filterBlogs} heading={"Latest Blogs"} />
      <Authors />
    </article>
  );
};

export default Home;
