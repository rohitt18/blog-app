import "./post.css";
import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCategories">
          {post.categories.map((cat) => (
            <span className="postCategory">{cat.name}</span>
          ))}
        </div>
        <Link
          to={`/posts/${post._id}`}
          className="link"
          style={{ marginTop: "15px" }}
        >
          <span className="postTitle">{post.title}</span> <hr />
          {/* now if the user clicks on the title we get the post with that id, so how am i gonna fetch the data according to this id */}
          {/* Lets go to the singlePost & we will use the useLocation hook there to get the pathname and access the properties of that id */}
        </Link>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
};

export default Post;

// https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
