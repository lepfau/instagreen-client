import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";
import UploadWidget from "../UploadWidget";


class FormEditWall extends Component {

    state = {
    title: "",
    subtitle:"",
   image: "",
      httpResponse: null,
      error: null,
       };
  
    formRef = React.createRef();
  
    componentDidMount() {
      apiHandler
        .getWall()
        .then((apiResp) => {
          const postToEdit = apiResp.filter(
            (post) => post._id === this.props.match.params.id
          );
          this.setState({
            title: postToEdit[0].title,
            subtitle: postToEdit[0].subtitle,
           
            id: postToEdit[0]._id,
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
          this.props.history.push("/wall");
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
            <h2 className="title">Edit this Post</h2>
  
            <div className="form-group">
              <label className="label" htmlFor="name">
                Title
              </label>
              <input
                id="title"
                name="title"
                className="input"
                type="text"
                onChange={this.handleChange}
                defaultValue={this.state.name}
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
                placeholder="Tell us something about this picture"
                onChange={this.handleChange}
                defaultValue={this.state.description}
              ></textarea>
            </div>
  
            <div>
            <UploadWidget onFileSelect={this.handleFileSelect} name="image">
                Upload image
              </UploadWidget>
            </div>
  
            <button className="btn-submit">Save Changes</button>
          </form>
        </div>
      );
    }
  }
  
  export default withRouter(FormEditWall);