import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";
import UploadWidget from "../UploadWidget";

class FormCreatePlant extends Component {
  state = {
    name: "",
    description: "",
    age: 0,
    enlightment: "",
    watering: "",
    growingperiod: "",
    httpResponse: null,
    error: null,
  };


  showConsole = () => {
      this.props.showConsole()
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    console.log(key, value);
    this.setState({ [key]: value });
  };



  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    // Function implemented by user "Vladi Vlad" @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041

    apiHandler
    .createPlant(fd)
    .then((data) => {
        this.props.addItem(data);
      this.setState({
        name: "",
        description: "",
        httpResponse: {
          status: "success",
          message: "Item successfully added.",
        },
        

      });
      this.timeoutId = setTimeout(() => {
        this.setState({ httpResponse: null });
      }, 1000);
    })
    .catch((error) => {
        console.log(error)
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
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add a new Plant</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>


          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="text-area"
              placeholder="Tell us something about this plant"
              onChange={this.handleChange}
              value={this.state.description}
            ></textarea>
          </div>

          <div className="form-group">
            <UploadWidget ref={this.imageRef} name="image">
              Upload image
            </UploadWidget>
          </div>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreatePlant);
