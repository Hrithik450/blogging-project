import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useMainContext } from "../store/Context";

const UpdateBlog = () => {
  const { id } = useParams();
  const [formData, setformData] = useState({
    category: "",
    mainImage: "",
    intro: "",
    title: "",
    published: true,
  });

  const [previewData, setpreviewData] = useState({
    paraOneImagePreview: null,
    paraTwoImagePreview: null,
    mainImagePreview: null,
  });

  useEffect(() => {
    const FetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://blog-backend-c8by.onrender.com/api/v1/blog/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setformData({
            ...formData,
            category: response.data.Blog.category,
            intro: response.data.Blog.intro,
            title: response.data.Blog.title,
            published: response.data.Blog.published,
            mainImage: response.data.Blog.mainImage.url,
            paraOneImage: response.data.Blog.paraOneImage.url || null,
            paraTwoImage: response.data.Blog.paraTwoImage.url || null,
            paraOneTitle: response.data.Blog.paraOneTitle || null,
            paraTwoTitle: response.data.Blog.paraTwoTitle || null,
            paraOneContent: response.data.Blog.paraOneContent || null,
            paraTwoContent: response.data.Blog.paraTwoContent || null,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    FetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://blog-backend-c8by.onrender.com/api/v1/blog/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setformData({
          category: "",
          mainImage: "",
          intro: "",
          title: "",
          published: false,
          paraOneTitle: "",
          paraTwoTitle: "",
          paraOneImage: "",
          paraTwoImage: "",
          paraOneContent: "",
          paraTwoContent: "",
        });
        setpreviewData({
          paraOneImagePreview: null,
          paraTwoImagePreview: null,
          mainImagePreview: null,
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const mainImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpreviewData({
        ...previewData,
        mainImagePreview: reader.result,
      });
      setformData({
        ...formData,
        mainImage: file,
      });
    };
  };

  const ParaOneImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpreviewData({
        ...previewData,
        paraOneImagePreview: reader.result,
      });
      setformData({
        ...formData,
        paraOneImage: file,
      });
    };
  };

  const ParaTwoImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpreviewData({
        ...previewData,
        paraTwoImagePreview: reader.result,
      });
      setformData({
        ...formData,
        paraTwoImage: file,
      });
    };
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { Mode } = useMainContext();

  return (
    <article className={Mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3>Update Blog</h3>
        <form onSubmit={handleUpdate}>
          <div className="category-box">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setformData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Blog Category</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="CS">Computer Softwares</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Blog Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Blog Main Image</label>
            <img
              src={
                previewData.mainImagePreview
                  ? `${previewData.mainImagePreview}`
                  : `${formData.mainImage}`
              }
              alt="mainImage"
              className="mainImage"
            />
            <input
              type="file"
              onChange={mainImageHandler}
              style={{ border: "none" }}
            />
          </div>
          <textarea
            rows={25}
            className="intro"
            placeholder="Blog intro..."
            name="intro"
            value={formData.intro}
            onChange={handleChange}
          />
          <div className="sub-para">
            <input
              type="text"
              placeholder="para one Title"
              value={formData.paraOneTitle}
              onChange={handleChange}
              name="paraOneTitle"
            />
            <img
              src={
                previewData.paraOneImagePreview
                  ? `${previewData.paraOneImagePreview}`
                  : `${formData.paraOneImage}`
              }
              alt="paraOneImage"
            />
            <input
              type="file"
              onChange={ParaOneImageHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows={10}
              placeholder="Blog first para..."
              value={formData.paraOneContent}
              name="paraOneContent"
              onChange={handleChange}
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="para Two Title"
              value={formData.paraTwoTitle}
              onChange={handleChange}
              name="paraTwoTitle"
            />
            <img
              src={
                previewData.paraTwoImagePreview
                  ? `${previewData.paraTwoImagePreview}`
                  : `${formData.paraTwoImage}`
              }
              alt="paraTwoImage"
            />
            <input
              type="file"
              onChange={ParaTwoImageHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows={10}
              placeholder="Blog first para..."
              value={formData.paraTwoContent}
              name="paraTwoContent"
              onChange={handleChange}
            />
          </div>
          <div className="publish-box">
            <label>Publish Now</label>
            <select
              value={formData.published}
              onChange={(e) =>
                setformData({
                  ...formData,
                  published: e.target.value === "true",
                })
              }
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <button type="submit" className="update-btn">
            Update Blog
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateBlog;
