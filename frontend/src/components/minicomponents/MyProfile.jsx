import React from "react";
import { useMainContext } from "../store/Context";

const MyProfile = () => {
  const { User, isAuthenticated } = useMainContext();
  return (
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
  );
};

export default MyProfile;
