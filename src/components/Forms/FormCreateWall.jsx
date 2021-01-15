import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";


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
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add a new picture to the wall</h2>

          <div className="form-group">
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>


          <div className="form-group">
            <label className="label" htmlFor="description">
              Subtitle
            </label>
            <textarea
              id="subtitle"
              name="subtitle"
              className="text-area"
              placeholder="Tell us something about this plant"
              onChange={this.handleChange}
              value={this.state.subtitle}
            ></textarea>
          </div>



                <div>
            <input type="file"  name="image" onChange={this.handleChange} value={this.props.picture}>
            </input>
          </div>

          <button className="btn-submit">Post on the wall !</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreateWall);
