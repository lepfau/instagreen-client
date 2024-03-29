import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

import "../../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeLanguage() {
    context.changeLanguage()
  }

  return (
    <nav className="NavMain">
      <h3 className="logoApp">InstaGreen</h3>

      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
              <li>
              <p onClick={() => changeLanguage()}>French</p>
            </li>
            <li>
              <NavLink to="/wall">Wall</NavLink>
            </li>
            <li>
              <NavLink to="/myplants">Plants</NavLink>
            </li>

            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/map">Map</NavLink>
            </li>

            <li>
              <NavLink to="/profile">
                {context.user && context.user.firstName}
              </NavLink>
            </li>
            <li>
              <p style={{ cursor: "pointer" }} onClick={handleLogout}>
                Logout
              </p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
