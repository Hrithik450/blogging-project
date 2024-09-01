import React, { useEffect, useState } from "react";
import { useMainContext } from "../store/Context";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const SingleBlog = () => {
  const { Mode, isAuthenticated } = useMainContext();
  const { id } = useParams();
  const [Blog, setBlog] = useState({});

  useEffect(() => {
    const GetBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/v1/blog/${id}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setBlog(response.data.Blog);
        }
      } catch (error) {
        setBlog({});
      }
    };
    GetBlog();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (!Blog || !Blog.mainImage || !Blog.mainImage.url) {
    return (
      <>
        <BeatLoader size={30} color="gray" />
      </>
    );
  }

  return (
    <article
      className={Mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {Blog && (
        <section className="container">
          <div className="category">{Blog.category}</div>
          <h1>{Blog.title}</h1>

          <div className="writer_section">
            <div className="author">
              <img src={Blog.authorAvatar} alt="author" />
              <p>{Blog.authorName}</p>
            </div>
          </div>

          {Blog && Blog.mainImage.url && (
            <img src={Blog.mainImage.url} alt="mainImage" className="mainImg" />
          )}
          <p className="intro-text">{Blog.intro}</p>
          <div className="sub-para">
            <h3>{Blog.paraOneTitle}</h3>
            {Blog && Blog.paraOneImage && (
              <img src={Blog.paraOneImage.url} alt="paraOneImage" />
            )}
            <p>{Blog.paraOneContent}</p>
          </div>
          <div className="sub-para">
            <h3>{Blog.paraTwoTitle}</h3>
            {Blog && Blog.paraTwoImage && (
              <img src={Blog.paraTwoImage.url} alt="paraTwoImage" />
            )}
            <p>{Blog.paraTwoContent}</p>
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleBlog;
