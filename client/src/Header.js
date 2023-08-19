import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import "./topbar.css";
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;


  return (
    <header>
      <div className="top">
      <div className="topLeft">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
      <i className="topIcon fab fa-facebook-square"></i>
    </a>
<a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
    <i className="topIcon fab fa-instagram-square"></i>
  </a>
  {/* <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
    <i className="topIcon fab fa-pinterest-square"></i>
  </a> */}
  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
    <i className="topIcon fab fa-twitter-square"></i>
  </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link title9" to="/">
              WoofWoof!
            </Link>
          </li>
          {/* <li className="topListItem">
          <Link className="link title9" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
          <Link className="link title9"  to="/about">
              CONTACT
            </Link>
          </li> */}
          {username && <li className="topListItem">
            <Link className="link title9" to="/create" >
              ADD
            </Link>
          </li>}
          {username && <li className="topListItem" onClick={logout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {!username && (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
      </div>
      
    </header>
  );
}

{/* <Link to="/" className="logo" >
        <div className="title9">WoofWoof!!</div></Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav> */}