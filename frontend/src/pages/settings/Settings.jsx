import "./settings.css";
import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username: username,
      email: email,
      password: password,
    };
    // im not gonna send this directly bec we can upload any image here
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/api/v1/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axios.patch("/api/v1/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      // window.location.replace("/users/" + res.data._id);
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePicture}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username} // when i refresh its gone bec we haven't updated the store yet
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
