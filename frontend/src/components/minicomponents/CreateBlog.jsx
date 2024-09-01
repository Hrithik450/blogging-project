import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateBlog = () => {
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

  const handleBlog = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "https://blog-backend-c8by.onrender.com/api/v1/blog/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
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

  return (
    <section className="create-blog">
      <h3>CREATE BLOG</h3>
      <div className="container">
        <form onSubmit={handleBlog}>
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
                  : "/imagevector.jpg"
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
                  : "/imagevector.jpg"
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
                  : "/imagevector.jpg"
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
          <button type="submit" className="create-btn">
            Create Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
