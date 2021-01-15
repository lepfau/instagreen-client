import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";

require("dotenv").config();
// import mapboxgl from "mapbox-gl";
// mapboxgl.accessToken = "MAPBOX_ACCESS_TOKEN";

class FormEditPlant extends Component {

  state = {
    name: "",
    description: "",
    image:null,
    enlightment: "",
    watering: "",
    wateringinterval: "",
    growingperiod: "",
    isWatered: true,
    waterDate: "",
    httpResponse: null,
    error: null,
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
          image: plantToEdit[0].image,
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
          <h2 className="title">Edit this Plant</h2>

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
              defaultValue={this.state.name}
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
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
              defaultValue={this.state.description}
            ></textarea>
          </div>

          <div>
          <input type="file"  name="image" onChange={this.handleChange} value={this.props.image}>
            </input>
          </div>

          <button className="btn-submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormEditPlant);
