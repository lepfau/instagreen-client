import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";

class FormCreatePlant extends Component {
  state = {
    name: "",
    description: "",
    image:
      "https://cdn1.iconfinder.com/data/icons/gardening-filled-line/614/1935_-_Growing_Plant-512.png",

    enlightment: "",
    watering: "",
    wateringinterval: "",
    growingperiod: "",
    isWatered: true,
    waterDate: "",
    httpResponse: null,
    error: null,
    file: null,
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [key]: value });
  };

  handleChangeFile = (event) => {
    event.preventDefault();
    this.setState({
      image: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .createPlant(fd)
      .then((data) => {
        this.props.addItem(data);
        this.setState({
          name: "",
          description: "",
          enlightment: "",
          watering: "",
          wateringinterval: 0,
          growingperiod: "",
          image: null,
          file: null,
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
          },
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });
      });
  };

  render() {
    return (
      <div className="PlantFormContainer">
        <form className="PlantForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="labelplant" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="inputplant"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <label className="labelplant" htmlFor="enlightment">
              Enlightment
            </label>
            <select
              className="selectplant"
              name="enlightment"
              onChange={this.handleChange}
              value={this.state.enlightment}
            >
              <option value="">Choose an option</option>
              <option value="Direct sun">Direct sun</option>
              <option value="Bright light">Bright light</option>
              <option value="Filtered light">Filtered light</option>
              <option value="Shade">Shade</option>
            </select>
          </div>

          <div className="form-group">
            <label className="labelplant" htmlFor="watering">
              Watering level
            </label>
            <select
              className="selectplant"
              name="watering"
              onChange={this.handleChange}
              value={this.state.watering}
            >
              <option value="">Choose an option</option>
              <option value="Heavy">Heavy</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label className="labelplant" htmlFor="wateringinterval">
              Water interval
            </label>
            <input
              className="inputplant"
              id="wateringinterval"
              name="wateringinterval"
              type="number"
              onChange={this.handleChange}
              value={this.state.wateringinterval}
            />
          </div>

          <div>
            <input
              id="file"
              className="inputfile"
              type="file"
              name="image"
              onChange={this.handleChangeFile}
              value={this.props.image}
            ></input>
            <label htmlFor="file">Choose a file</label>
          </div>

          <button className="btn-submit-plant">Add Plant</button>
        </form>
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
      </div>
    );
  }
}

export default withRouter(FormCreatePlant);
