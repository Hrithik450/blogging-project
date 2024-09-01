import React, { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const Authors = () => {
  const [authors, setauthors] = useState([]);

  useEffect(() => {
    const FetchAuthors = async () => {
      try {
        const response = axios.get(
          "https://blog-backend-c8by.onrender.com/api/v1/user/authors",
          { withCredentials: true }
        );
        if ((await response).status === 200) {
          setauthors((await response).data.Authors);
        }
      } catch (error) {
        setauthors([])
      }
    };

    FetchAuthors();
  }, []);

  return (
    <section className="popularAuthors">
      <h1>Authors</h1>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.slice(0, 4).map((element) => {
            return (
              <div className="card" key={element._id}>
                <img src={element.avatar.url} alt="avatar-image" />
                <p>{element.name}</p>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <BeatLoader size={30} color="gray" />
        )}
      </div>
    </section>
  );
};

export default Authors;
