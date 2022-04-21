import "./singlePost.css";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname.split("/")[2]);
  // once we get the id we can then we can fetch the data using this id
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  // to edit post
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/api/v1/posts/" + path);
      setPost(res.data);
      // console.log(res.data);

      // to edit the changes
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    fetchPost();
  }, [path]);

  // to delete post
  const handleDelete = async () => {
    try {
      // its very imp to write {data:{}} here otherwise we would get an error of unauthorized bec its axios.delete
      await axios.delete(`/api/v1/posts/${post._id}`, {
        data: {
          username: user.username,
        },
      });
      window.location.replace("/");
    } catch (error) {}
  };
  // to update post
  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/v1/posts/${post._id}`, {
        // bec postId is req
        username: user.username,
        title: title,
        description: description,
      });
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitlteInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitlte">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            type="text"
            value={description}
            className="singlePostDescriptionInput"
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlePostDescription">{description}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;

// https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
