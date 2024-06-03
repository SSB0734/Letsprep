import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "../../Styles/Navbar.css";
import { auth } from "../../firebaseApp";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import useWindowWitdh from "../Hook/useWidth";
import Logout from "@mui/icons-material/Logout";
import { Divider, ListItemIcon, MenuItem } from "@mui/material";

function Navbar() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const location = useLocation();
  const [width, isDesktop] = useWindowWitdh();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const params=useParams();
  // //console.log(params);
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    $(".navbar-collapse").removeClass("show");
  };

  const jQueryCode = () => {
    $(".navbar-collapse").removeClass("show");
  };
  const node = useRef();
  const getAfterLogoText = () => {
    if (isDesktop) return null;
    switch (location.pathname) {
      case "/courses":
        return <span style={{ fontSize: "14px" }}>- Courses</span>;
      case "/about":
        return <span style={{ fontSize: "14px" }}>- About</span>;
      case "/interview-experience":
        return <span style={{ fontSize: "14px" }}>- Interview Experience</span>;
      case "/job-openings":
        return <span style={{ fontSize: "14px" }}>- Job Openings</span>;
      default:
        return null;
    }
    return <span>{}</span>;
  };
  const admins = ["letsprep.ajs@gmail.com", "earthboxer@gmail.com"];

  return (
    <div id='mainmainnavbar'>
      <nav ref={node} class='navbar navbar-expand-lg navbar-dark navbar-custom'>
        <div class='container-fluid'>
          <Link class='navbar-brand' to='/'>
            LetsPrep! {getAfterLogoText()}
          </Link>
          <button
            class='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
              <li class='nav-item'>
                <Link
                  onClick={jQueryCode}
                  class='nav-link'
                  aria-current='page'
                  to='/courses'
                >
                  Courses
                </Link>
              </li>
              <li class='nav-item'>
                <Link
                  onClick={jQueryCode}
                  class='nav-link'
                  to='/interview-experience'
                >
                  Interview Experiences
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link class="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li> */}
              <li class='nav-item'>
                <Link onClick={jQueryCode} class='nav-link' to='/job-openings'>
                  Job Openings
                </Link>
              </li>
              <li class='nav-item'>
                <Link onClick={jQueryCode} class='nav-link' to='/resources'>
                  Resources
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link class="nav-link" to="/community">
                  Community
                </Link>
              </li> */}
              {/* <li class='nav-item'>
                <Link onClick={jQueryCode} class='nav-link' to='/road-map'>
                  Road Maps
                </Link>
              </li> */}
              <li class='nav-item'>
                <Link onClick={jQueryCode} class='nav-link' to='/about'>
                  About
                </Link>
              </li>
              {admins.includes(user?.email) ? (
                <>
                  <li class='nav-item'>
                    <Link onClick={jQueryCode} class='nav-link' to='/addcourse'>
                      Add Course
                    </Link>
                  </li>
                  <li class='nav-item'>
                    <Link
                      onClick={jQueryCode}
                      class='nav-link'
                      to='/validate-job'
                    >
                      Validate Job
                    </Link>
                  </li>
                  <li class='nav-item'>
                    <Link
                      onClick={jQueryCode}
                      class='nav-link'
                      to='/validate-ie'
                    >
                      Validate IE
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              {/* <li class='nav-item dropdown'>
                <a
                  class='nav-link dropdown-toggle'
                  href='#'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropdown
                </a>
                <ul class='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    <a class='dropdown-item' href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a class='dropdown-item' href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class='dropdown-divider'></hr>
                  </li>
                  <li>
                    <a class='dropdown-item' href='#'>
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li class='nav-item'>
                <a class='nav-link disabled'>Disabled</a>
              </li> */}
            </ul>
            {/* <form class='d-flex'>
              <input
                class='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button class='btn btn-outline-success btn-sm' type='submit'>
                <span class='material-icons'>search</span>
              </button>
            </form> */}
            {/* <ul> */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem
                onClick={() => {
                  history.push("/profile");
                }}
              >
                <Avatar src={user?.photoURL} />
                &nbsp;&nbsp;
                <div>
                  <div>{user?.displayName}</div>
                  <div>{user?.email}</div>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleAuthentication}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            {width < 992 && <hr />}
            <Link
              style={{ textDecoration: "none" }}
              onClick={jQueryCode}
              to={!user && "/signup"}
            >
              {user ? (
                width >= 992 ? (
                  <div
                    onClick={handleClickProfile}
                    style={{
                      color: "white",
                      marginRight: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={user?.photoURL} />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      paddingBottom: "5px",
                      justifyContent: "space-between",
                      color: "white",
                    }}
                  >
                    <div
                      onClick={() => {
                        history.push("/profile");
                      }}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Avatar src={user?.photoURL} />
                      &nbsp;&nbsp;
                      <div>
                        <div>{user?.displayName}</div>
                      </div>
                    </div>
                    <div
                      onClick={handleAuthentication}
                      style={{ display: "flex" }}
                    >
                      <Logout fontSize='large' color='error' />
                    </div>
                  </div>
                )
              ) : (
                <button
                  onClick={handleAuthentication}
                  id='signup'
                  class='btn btn-outline-danger '
                >
                  <div>
                    Sign Up <span class='st material-icons '>login</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                </button>
              )}
            </Link>
            {/* </ul> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
