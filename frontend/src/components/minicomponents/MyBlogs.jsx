import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [MyBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const FetchMyBlogs = async () => {
      try {
        const response = await axios.get(
          "https://blog-backend-c8by.onrender.com/api/v1/blog/blogs/MyBlogs",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setMyBlogs(response.data.Blogs);
        }
      } catch (error) {
        setMyBlogs([]);
      }
    };
    FetchMyBlogs();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `https://blog-backend-c8by.onrender.com/api/v1/blog/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="my-blogs">
      {MyBlogs && MyBlogs.length > 0 ? (
        MyBlogs.map((element) => {
          return (
            <div className="author-blog-card" key={element._id}>
              {element.mainImage && (
                <img src={element.mainImage.url} alt="blogImg" />
              )}
              <span className="category"> {element.category}</span>
              <h4>{element.title}</h4>
              <div className="btn-wrapper">
                <Link to={`/blog/update/${element._id}`} className="update-btn">
                  Update
                </Link>
                <button
                  onClick={() => deleteBlog(element._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <>You have Not posted any Blog Yet </>
      )}
    </section>
  );
};

export default MyBlogs;
