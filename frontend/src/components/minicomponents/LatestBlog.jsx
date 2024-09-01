import React from "react";
import { Link } from "react-router-dom";

const LatestBlog = ({ newClass, heading, Blogs }) => {
  return (
    <section
      className={
        newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"
      }
    >
      <h3>{heading}</h3>
      <div className="container">
        {Blogs &&
          Blogs.map((element) => {
            return (
              <Link
                to={`/blog/${element._id}`}
                className="card"
                key={element._id}
              >
                <img src={element.mainImage.url} alt="mainImage" />
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
          })}
      </div>
    </section>
  );
};

export default LatestBlog;
