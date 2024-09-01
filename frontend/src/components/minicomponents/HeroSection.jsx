import React from "react";
import { useMainContext } from "../store/Context";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { Blogs } = useMainContext();

  return (
    <section className="hero">
      {Blogs && Blogs.length > 0 ? (
        Blogs.slice(0, 2).map((element) => {
          return (
            <Link
              to={`/blog/${element._id}`}
              className="card"
              key={element._id}
            >
              <img
                src={element.mainImage.url}
                alt="main-img"
                className="blogImg"
              />
              <h1>{element.title}</h1>
              <div className="writer_section">
                <div className="author">
                  <img src={element.authorAvatar} alt="Author" />
                  <p>{element.authorName}</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <BeatLoader size={30} color="gray" />
      )}
    </section>
  );
};

export default HeroSection;
