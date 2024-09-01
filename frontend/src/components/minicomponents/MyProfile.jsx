import React from "react";
import { useMainContext } from "../store/Context";

const MyProfile = () => {
  const { User, isAuthenticated, Mode } = useMainContext();

  if (!isAuthenticated) {
    return (
      <>
        <article className={Mode === "dark" ? "dark-bg" : "light-bg"}>
          <div
            style={{
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Please Login!</span>{" "}
          </div>
        </article>
      </>
    );
  }

  return (
    <article className={Mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="profile">
        <div className="avatar">
          <img src={User && User.avatar.url} alt="avatar" />
        </div>
        <div className="user-detail">
          <p>
            Name:<span>{User.name}</span>
          </p>
          <p>
            Email:<span>{User.email}</span>
          </p>
          <p>
            Phone:<span>{User.phone}</span>
          </p>
          <p>
            role:<span>{User.role}</span>
          </p>
        </div>
      </section>
    </article>
  );
};

export default MyProfile;
