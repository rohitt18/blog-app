import "./home.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  // const location = useLocation();
  // console.log(location); // when we type localhost:3000/?user=monicaupdated i,e in the home page we have the search property which we can use
  const { search } = useLocation();

  useEffect(() => {
    // i cant fetch data directly here saying axios bec we're gonna be using async func, therefore we'll create a func here
    const fetchPosts = async () => {
      const res = await axios.get("/api/v1/posts" + search);
      setPosts(res.data);
      // console.log(res.data);
    };
    fetchPosts();
  }, [search]); // means - fire this useEffect just at the beginning

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
