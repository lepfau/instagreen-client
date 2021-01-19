import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";

class FormCreatePlant extends Component {
  state = {
    name: "",
    description: "",
    image: null,
    enlightment: "",
    watering: "",
    wateringinterval: "",
    growingperiod: "",
    isWatered: true,
    waterDate: "",
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
            <select className="selectplant"
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
            <select className="selectplant"
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
            className="fileplant"
              type="file"
              name="image"
              onChange={this.handleChange}
              value={this.props.image}
            ></input>
          </div>

          <button className="btn-submit-plant">Add Plant</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreatePlant);
