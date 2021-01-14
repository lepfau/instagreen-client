import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import UploadWidget from "../UploadWidget";

require("dotenv").config();
// import mapboxgl from "mapbox-gl";
// mapboxgl.accessToken = "MAPBOX_ACCESS_TOKEN";

class FormEditPlant extends Component {
  state = {};

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
          image: plantToEdit[0].image
        });
      })
      .catch((err) => {});
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    console.log(key, value);
    this.setState({ [key]: value });
  };

 


  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .editItem(this.state.id, this.state)
      .then((data) => {
        this.props.history.push("/myplants");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Edit this Plant</h2>
<img src={this.state.image}/>
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
              placeholder="What are you giving away ?"
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
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
              value={this.state.description}
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