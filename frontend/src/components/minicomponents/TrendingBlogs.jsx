import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMainContext } from "../store/Context";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const TrendingBlogs = () => {
  const { Blogs } = useMainContext();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="trending">
      <h3>Trending</h3>
      <Carousel responsive={responsive}>
        {Blogs && Blogs.length > 0 ? (
          Blogs.slice(0, 6).map((element) => {
            return (
              <Link
                to={`/blog/${element._id}`}
                className="card"
                key={element._id}
              >
                <img
                  src={element.mainImage.url}
                  alt="Blog"
                  className="blogImg"
                />
                <span className="category">{element.category}</span>
                <h4>{element.title}</h4>
                <div className="writer_section">
                  <div className="author">
                    <img src={element.authorAvatar} alt="author" />
                    <p>{element.authorName}</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <BeatLoader size={30} color="gray" />
        )}
      </Carousel>
    </div>
  );
};

export default TrendingBlogs;
