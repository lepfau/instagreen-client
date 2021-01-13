import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Redirect } from "react-router-dom";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div class="formcontainersignup">
      <form onSubmit={this.handleSubmit} className="signupform">
        <label htmlFor="firstName">First Name</label>
        <input className="signupinput"
          onChange={this.handleChange}
          value={this.state.firstName}
          type="text"
          id="firstName"
          name="firstName"
        />
        <label htmlFor="lastName">Last Name</label>
        <input className="signupinput"
          onChange={this.handleChange}
          value={this.state.lastName}
          type="text"
          id="lastName"
          name="lastName"
        />
        <label htmlFor="email">Email</label>
        <input className="signupinput"
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input className="signupinput"
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <button> Register </button>
      </form>
      </div>
    );
  }
}

export default withRouter(FormSignup);
