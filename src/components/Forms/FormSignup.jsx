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
    profileImg: "",
    file:
      "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png",
    loading: false,
    message: null,
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleChangeFile = (event) => {
    event.preventDefault();
    this.setState({
      profileImg: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
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
        this.props.history.push("/wall");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/wall" />;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="wallForm2">
          <form
            onSubmit={this.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <h2
              style={{ alignSelf: "center", marginBottom: "20px" }}
              className="myplantstitle"
            >
              Create your account
            </h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                className="inputwall"
                onChange={this.handleChange}
                value={this.state.firstName}
                type="text"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="inputwall"
                onChange={this.handleChange}
                value={this.state.lastName}
                type="text"
                id="lastName"
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="inputwall"
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="inputwall"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                id="password"
                name="password"
              />
            </div>
            <div style={{ alignSelf: "center" }}>
              <input
                id="profileImg"
                className="inputfile"
                type="file"
                name="profileImg"
                onChange={this.handleChangeFile}
                // value={this.state.profileImg}
              ></input>
              <label htmlFor="profileImg">Choose a picture</label>
            </div>
            <div
              style={{
                height: "220px",
                width: "220px",
                alignSelf: "center",
                marginTop: "20px",
              }}
              className="ppusercontainercomment"
            >
              {this.state.file !== null && (
                <img
                  className="ppwall"
                  src={this.state.file}
                  alt="recipeimage"
                />
              )}
            </div>

            <button
              style={{ alignSelf: "center", marginLeft: "0px" }}
              className="btn-submit-plant"
            >
              {" "}
              Register{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignup);
