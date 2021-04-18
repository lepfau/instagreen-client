import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import loadingwall from "../../assets/loadingwall.gif";

export class UpdateUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    profileImg: "",
    id: "",
    file: null,
    loading: false,
    message: null,
  };

  formRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getProfile()
      .then((apiRes) => {
        console.log(apiRes);
        this.setState({
          id: apiRes._id,
          firstName: apiRes.firstName,
          lastName: apiRes.lastName,
          email: apiRes.email,
          profileImg: apiRes.profileImg,
          file: apiRes.profileImg,
        });
      })
      .catch((err) => {
        console.log(err);
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

    apiHandler
      .editUser(this.state.id, fd)
      .then((data) => {
        this.setState({ loading: true });

        setTimeout(() => {
          this.setState({ loading: false });
          this.setState({ message: "Updated!" });
        }, 1000);

        setTimeout(() => {
          this.setState({ message: null });
        }, 3000);
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div class="wallForm2">
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
              Update your infos
            </h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                className="inputwall"
                onChange={this.handleChange}
                defaultValue={this.state.firstName}
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
                defaultValue={this.state.lastName}
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
                defaultValue={this.state.email}
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div style={{ alignSelf: "center" }}>
              <input
                className="inputfile"
                type="file"
                name="profileImg"
                id="profileImg"
                onChange={this.handleChangeFile}
                defaultValue={this.state.profileImg}
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
            <div style={{ alignSelf: "center" }}>
              {this.state.loading ? (
                <button
                  className="btn-submit-plant"
                  style={{ marginLeft: "0px" }}
                >
                  <img
                    style={{ height: "35px" }}
                    src={loadingwall}
                    alt="loading"
                  />
                </button>
              ) : this.state.message !== null ? (
                <button
                  style={{ marginLeft: "0px" }}
                  className="btn-submit-plant"
                >
                  {this.state.message}
                </button>
              ) : (
                <button
                  style={{ marginLeft: "0px" }}
                  className="btn-submit-plant"
                >
                  Update profile
                </button>
              )}
              {/* {this.state.message !== null ? (
                <p
                  style={{
                    background: "green",
                    color: "white",
                    fontSize: "1em",
                    margin: "10px",
                    padding: "10px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                >
                  {this.state.message}{" "}
                </p>
              ) : null} */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateUser;
