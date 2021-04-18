import React from "react";
import FormSignin from "../components/Forms/FormSignin";
import { NavLink } from "react-router-dom";

const Signin = (props) => {
  return (
    <div className="signincontainer">
      <div className="signin">
        <div className="signin_left">
          <h1 className="signin_left_title"> InstaGreen</h1>
          <h2 className="signin_left_subtitle">
            Your plant care starts here...
          </h2>
          <section className="homeinfos">
            <article className="homecontainer">
              <h3> Share </h3>
              <p className="containertext">
                Add your plants and share them with your friends !
              </p>
            </article>
            <article className="homecontainer">
              <h3> Care </h3>
              <p className="containertext">
                Know how to treat your plants and get helped by the community
              </p>
            </article>
            <article className="homecontainer">
              <h3> Exchange </h3>
              <p className="containertext">
                Exchange your plants or offer cuttings to anyone !
              </p>
            </article>
          </section>
        </div>

        <div className="signin_right">
          <FormSignin />
          <p className="signin_right_text">
            {" "}
            No account yet ?<NavLink to="/signup">Sign up here !</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
