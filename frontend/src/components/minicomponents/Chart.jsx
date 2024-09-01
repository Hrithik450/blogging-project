import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import MyBlogs from "./MyBlogs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Chart = () => {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const FetchMyBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/blog/blogs/MyBlogs",
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

  const publishedBlogs =
    myBlogs && myBlogs?.filter((blog) => blog.published === true);

  const UnpublishedBlogs =
    myBlogs && myBlogs?.filter((blog) => blog.published === false);

  const data = {
    labels: ["Published", "Not Published"],
    datasets: [
      {
        label: "Blogs",
        data: [
          publishedBlogs.length > 0 ? publishedBlogs.length : 0,
          UnpublishedBlogs.length > 0 ? UnpublishedBlogs.length : 0,
        ],
        borderColor: ["#0e7490", "#facc15"],
        backgroundColor: ["#0e7490", "#facc15"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="chart-container" style={{ height: "90vh" }}>
      <h3>Blog Analytics</h3>
      <Doughnut data={data} style={{ height: "550px" }} />
    </section>
  );
};

export default Chart;
