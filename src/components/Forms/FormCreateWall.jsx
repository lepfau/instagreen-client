import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";
import UploadWidget from "../UploadWidget";

class FormCreateWall extends Component {

  state = {
    title: "",
    author: "",
    subtitle: "",
    comments: "",
    picture: null,
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
    .createWall(fd)
    .then((data) => {
      console.log(data["id_user"].firstName)
        this.props.addItem(data);
      this.setState({
        title: "",
        subtitle: "",
        image: "",
        comments: "",
               
        httpResponse: {
          status: "success",
          message: "Item successfully added.",
        },
        

      })
   
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
      <div className="wallForm">
        <form className="form" onSubmit={this.handleSubmit}>
      
          <div className="form-group">
            <label className="labelwall" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="inputwall"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>


          <div className="form-group">
            <label className="labelwall" htmlFor="description">
              Subtitle
            </label>
            <input
              id="subtitle"
              name="subtitle"
              className="inputwall"
              placeholder="Tell us something about this plant"
              onChange={this.handleChange}
              value={this.state.subtitle}
            ></input>
          </div>



                <div>
            <input className="fileplant" type="file"  name="image" onChange={this.handleChange} value={this.props.picture}>
            </input>
          </div>

          <button className="btn-submit-plant">Post on the wall !</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreateWall);
