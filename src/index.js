import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/Auth/UserProvider";
import App from "./App";

import "./styles/reset.css";
import "./styles/global.css";
import "./styles/homepage.css";
import "./styles/login.css";
import "./styles/signup.css";
import "./styles/myplants.css";
import "./styles/wall.css";
import "./styles/Mobile.css";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
