import "./sidebar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  // const location = useLocation();
  // console.log(location);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get("api/v1/categories");
      setCats(res.data);
      // console.log(res.data);
    };
    fetchCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://media.istockphoto.com/photos/lovely-woman-with-purple-tulips-bunch-picture-id1131783260?b=1&k=20&m=1131783260&s=170667a&w=0&h=xvQ9ryDOeybG5A-A5kn9gNC9uVG_AGSMvFbJCUig1tk="
          alt=""
        />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          eum accusantium autem facere quam aut
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarSocialIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarSocialIcon fa-brands fa-twitter-square"></i>
          <i className="sidebarSocialIcon fa-brands fa-pinterest-square"></i>
          <i className="sidebarSocialIcon fa-brands fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
