import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMainContext } from "../store/Context";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const Authors = () => {
  const [authors, setauthors] = useState([]);
  const { Mode } = useMainContext();

  useEffect(() => {
    const FetchAuthors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/user/authors",
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log(response);
          setauthors(response.data.Authors);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    FetchAuthors();
  }, []);

  return (
    <article
      className={
        Mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>All Authors</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img src={element.avatar.url} alt="avatar_url" />
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <>
            <BeatLoader size={30} color="gray" />
          </>
        )}
      </div>
    </article>
  );
};

export default Authors;
