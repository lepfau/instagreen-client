import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";
import loadingwall from "../../assets/loadingwall.gif";

class FormCreateWall extends Component {
  state = {
    title: "",
    author: "",
    subtitle: "",
    comments: "",
    image:
      "https://cdn1.iconfinder.com/data/icons/gardening-filled-line/614/1935_-_Growing_Plant-512.png",
    httpResponse: null,
    error: null,
    loading: false,
    file: null,
  };

  handleChangeFile = (event) => {
    event.preventDefault();
    this.setState({
      image: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    console.log(key, value);
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .createWall(fd)
      .then((data) => {
        setTimeout(() => {
          this.props.addPost(data);
          this.setState({
            title: "",
            subtitle: "",
            image: "",
            comments: "",
            file: null,
            loading: false,
            httpResponse: {
              status: "success",
              message: "Item successfully added.",
            },
          });
        }, 1500);
        this.setState({
          loading: true,
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };

  render() {
    return (
      <div className="wallForm">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="labelwall" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="inputwall"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>

          <div className="form-group">
            <label className="labelwall" htmlFor="description">
              Subtitle
            </label>
            <input
              id="subtitle"
              name="subtitle"
              className="inputwall"
              placeholder="Tell us something about this plant"
              onChange={this.handleChange}
              value={this.state.subtitle}
            ></input>
          </div>

          <div>
            <input
              id="file"
              className="inputfile"
              type="file"
              name="image"
              onChange={this.handleChangeFile}
            ></input>
            <label htmlFor="file">Choose a file</label>
          </div>
          {this.state.file !== null && (
            <img
              style={{
                width: "350px",
                height: "auto",
                display: "flex",
                marginLeft: "60px",
                marginTop: "20px",
              }}
              src={this.state.file}
              alt="recipeimage"
            />
          )}
          {this.state.loading ? (
            <button className="btn-submit-plant">
              <img style={{ height: "35px" }} src={loadingwall} alt="loading" />
            </button>
          ) : (
            <button className="btn-submit-plant">Post on the wall</button>
          )}
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreateWall);
