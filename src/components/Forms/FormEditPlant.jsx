import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";
import UploadWidget from "../UploadWidget";


require("dotenv").config();
// import mapboxgl from "mapbox-gl";
// mapboxgl.accessToken = "MAPBOX_ACCESS_TOKEN";

class FormEditPlant extends Component {
 
  state = {
    httpResponse: null,
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
         
          id: plantToEdit[0]._id,
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
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
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
            <select className="selectplant"
              name="enlightment"
              onChange={this.handleChange}
              defaultValue={this.state.enlightment}
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
              defaultvalue={this.state.watering}
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
              onChange={this.handleFileSelect}
          
            ></input>
          </div>

          <button className="btn-submit-plant">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormEditPlant);
