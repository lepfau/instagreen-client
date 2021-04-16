import React, { Component } from "react";
import AutoComplete from "./AutoComplete";
import UploadWidget from "../../components/Divers/UploadWidget";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import "../../styles/ItemForm.css";
import FeedBack from "./FeedBack";

class ItemForm extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    quantity: "",
    location: {
      coordinates: [],
    },
    address: "",
    phone: "",
    httpResponse: null,
    error: null,
  };

  formRef = React.createRef();

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .addItem(fd)
      .then((data) => {
        this.props.addItem(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
          },
          name: "",
          quantity: "",
          location: {
            coordinates: [],
          },
          address: "",
          phone: "",
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
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

  handlePlace = (place) => {
    const location = place.geometry;
    this.setState({ location, formattedAddress: place.place_name });
  };

  render() {
    const { httpResponse, error } = this.state;
    return (
      <div className="ItemForm-container">
        <form
          ref={this.formRef}
          className="ItemForm"
          onSubmit={this.handleSubmit}
        >
          <p onClick={this.props.handleClose} className="close-link">
            X
          </p>
          <h2 style={{ marginBottom: "20px" }}>Give a plant cut !</h2>
          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="What are you giving away ?"
              name="name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Quantity
            </label>
            <input
              value={this.state.quantity}
              onChange={this.handleChange}
              className="input"
              type="number"
              name="quantity"
              placeholder="How much do you have"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <AutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Image
            </label>
            <input
              className="input"
              type="file"
              onChange={this.handleChange}
              placeholder="Choose file"
              name="image"
            />
          </div>

          <h4>Contact information</h4>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Phone number
            </label>
            <input
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.phone}
              placeholder="Enter your phone number"
              name="phone"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button style={{ marginLeft: "0px" }} className="addplantbtn">
              Add Item
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemForm;
