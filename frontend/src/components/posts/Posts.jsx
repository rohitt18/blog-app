import "./posts.css";
import React from "react";
import Post from "../post/Post";

const Posts = ({ posts }) => {
  // catching the posts which we passed as a prop
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
};

export default Posts;
