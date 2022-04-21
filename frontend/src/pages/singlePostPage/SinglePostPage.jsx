import "./singlePostPage.css";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";

const SinglePostPage = () => {
  return (
    <div className="singlePostPage">
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default SinglePostPage;
