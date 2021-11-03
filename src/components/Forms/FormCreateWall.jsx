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
            {this.props.language === "French" ?  <label className="labelwall" htmlFor="title">
              Titre
            </label> :  <label className="labelwall" htmlFor="title">
              Title
            </label>}
      
          {this.props.language === "French" ?   <input
              id="title"
              name="title"
              className="inputwall"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
              placeholder="Ajouter un titre"
            /> : 
            <input
            id="title"
            name="title"
            className="inputwall"
            type="text"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Add a title to your post"
          />}
          </div>

          <div className="form-group">
            <label className="labelwall" htmlFor="description">
              Description
            </label>
            <input
              id="subtitle"
              name="subtitle"
              className="inputwall"
              placeholder="You can add description here"
              onChange={this.handleChange}
              value={this.state.subtitle}
            ></input>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
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
              className="tempimgwall"
              src={this.state.file}
              alt="recipeimage"
            />
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {this.state.loading ? (
              <button
                style={{ marginLeft: "0px" }}
                className="btn-submit-plant"
              >
                <img
                  className="loadingwallgif"
                  src={loadingwall}
                  alt="loading"
                />
              </button>
            ) : (
              <button
                style={{ marginLeft: "0px" }}
                className="btn-submit-plant"
              >
                Post on the wall
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreateWall);
