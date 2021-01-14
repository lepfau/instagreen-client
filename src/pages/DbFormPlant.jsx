import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../utils";


class FormCreatePlant extends Component {
  state = {
    name: "",
    description: "",
    image:null,
    enlightment: "",
    watering: "",
    growingperiod: "",
    httpResponse: null,
    error: null,
  };


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
    .createDbPlant(fd)
    .then((data) => {
        this.props.addItem(data);
      this.setState({
        name: "",
        description: "",
        enlightment: "",
        watering:"",
        waterdays: 0,
        mintemp: 0,
        maxtemp:0,
        growingperiod:"",
        image: null,
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
            <label className="label" htmlFor="enlightment">
              enlightment
            </label>
          <select name="enlightment" onChange={this.handleChange}
              value={this.state.enlightment}>
          <option value="">--Please choose an option--</option>
    <option value="Direct sun">Direct sun</option>
    <option value="Bright light">Bright light</option>
    <option value="Filtered light">Filtered light</option>
    <option value="Shade">Shade</option>
          </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="watering">
              watering
            </label>
          <select name="watering" onChange={this.handleChange}
              value={this.state.watering}>
          <option value="">--Please choose an option--</option>
    <option value="Heavy">Heavy</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="waterdays">
              Watering interval
            </label>
            <input
              id="waterdays"
              name="waterdays"
              
              type="number"
              onChange={this.handleChange}
              value={this.state.waterdays}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="mintemp">
              Minimum temp
            </label>
            <input
              id="mintemp"
              name="mintemp"
              
              type="number"
              onChange={this.handleChange}
              value={this.state.mintemp}
            />
          </div>


          <div className="form-group">
            <label className="label" htmlFor="mintemp">
              Maximum temp
            </label>
            <input
              id="maxtemp"
              name="maxtemp"
              
              type="number"
              onChange={this.handleChange}
              value={this.state.maxtemp}
            />
          </div>

          


          <div>
            <input type="file"  name="image" onChange={this.handleChange} value={this.props.image}>
            </input>
          </div>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreatePlant);