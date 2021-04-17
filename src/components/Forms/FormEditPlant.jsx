import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";

require("dotenv").config();
// import mapboxgl from "mapbox-gl";
// mapboxgl.accessToken = "MAPBOX_ACCESS_TOKEN";

class FormEditPlant extends Component {
  state = {
    httpResponse: null,
    file: null,
  };

  formRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getPlants()
      .then((apiResp) => {
        const plantToEdit = apiResp.filter(
          (plant) => plant._id === this.props.match.params.id
        );
        this.setState({
          name: plantToEdit[0].name,
          description: plantToEdit[0].description,
          enlightment: plantToEdit[0].enlightment,
          watering: plantToEdit[0].watering,
          wateringinterval: plantToEdit[0].wateringinterval,
          id: plantToEdit[0]._id,
          file: plantToEdit[0].image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    console.log(key, value);
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
      .editItem(this.state.id, fd)
      .then((data) => {
        this.props.history.push("/myplants");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ image: file });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <form className="formEditplant" onSubmit={this.handleSubmit}>
          <h2 className="myplantstitle">Edit this Plant</h2>

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
              defaultValue={this.state.name}
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
              defaultValue={this.state.wateringinterval}
            />
          </div>

          <div>
            <input
              className="inputfile"
              type="file"
              name="image"
              onChange={this.handleChangeFile}
              id="image"
            ></input>
            <label htmlFor="image">Choose a file</label>
          </div>

          <button className="btn-submit-plant">Save Changes</button>
        </form>
        {this.state.file !== null && (
          <img
            style={{
              width: "350px",
              height: "auto",
              display: "flex",
              marginLeft: "60px",
              marginTop: "120px",
            }}
            src={this.state.file}
            alt="recipeimage"
          />
        )}
      </div>
    );
  }
}

export default withRouter(FormEditPlant);
