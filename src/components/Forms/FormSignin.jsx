import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { Redirect } from "react-router-dom";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/wall");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="signinParent">
        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          className="signinform"
        >
          <label className="signinform_label" htmlFor="email">
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="signinform_input"
          />

          <label className="signinform_label" htmlFor="password">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="signinform_input"
          />

          <button className="signinform_button">Log In</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignin);
