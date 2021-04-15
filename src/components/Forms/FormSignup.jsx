import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Redirect } from "react-router-dom";
import { buildFormData } from "../../utils";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    image: null,
    password: "",
    firstName: "",
    lastName: "",
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .signup(fd)
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
          <input
            className="signupinput"
            onChange={this.handleChange}
            value={this.state.firstName}
            type="text"
            id="firstName"
            name="firstName"
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            className="signupinput"
            onChange={this.handleChange}
            value={this.state.lastName}
            type="text"
            id="lastName"
            name="lastName"
          />
          <label htmlFor="email">Email</label>
          <input
            className="signupinput"
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="signupinput"
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            id="password"
            name="password"
          />
          <div>
            <input
              type="file"
              name="profileImg"
              onChange={this.handleChange}
              value={this.props.image}
            ></input>
          </div>

          <button> Register </button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignup);
