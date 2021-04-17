import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import { Redirect } from "react-router-dom";

export class UpdateUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    profileImg: "",
    id: "",
  };

  formRef = React.createRef();
  componentDidMount() {
    apiHandler.getProfile().then((apiRes) => {
      console.log(apiRes);
      this.setState({
        id: apiRes._id,
        firstName: apiRes.firstName,
        lastName: apiRes.lastName,
        email: apiRes.email,
        profileImg: apiRes.profileImg,
        file: apiRes.profileImg,
      });
    });
  }

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
    console.log(fd);
    apiHandler
      .editUser(this.state.id, fd)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        style={{
          position: "relative",
          top: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div class="formcontainersignup">
          <form onSubmit={this.handleSubmit} className="signupform">
            <label htmlFor="firstName">First Name</label>
            <input
              className="signupinput"
              onChange={this.handleChange}
              defaultValue={this.state.firstName}
              type="text"
              id="firstName"
              name="firstName"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              className="signupinput"
              onChange={this.handleChange}
              defaultValue={this.state.lastName}
              type="text"
              id="lastName"
              name="lastName"
            />
            <label htmlFor="email">Email</label>
            <input
              className="signupinput"
              onChange={this.handleChange}
              defaultValue={this.state.email}
              type="email"
              id="email"
              name="email"
            />

            <div>
              <input
                type="file"
                name="profileImg"
                id="profileImg"
                onChange={this.handleChangeFile}
                defaultValue={this.state.profileImg}
              ></input>
            </div>

            <button> Register </button>
          </form>
        </div>
        {/* <div>
          <img
            style={{ height: "200px", marginLeft: "50px" }}
            src={this.state.file}
          />
        </div> */}
      </div>
    );
  }
}

export default UpdateUser;
