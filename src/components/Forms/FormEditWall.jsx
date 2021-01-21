import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";
import UploadWidget from "../UploadWidget";


class FormEditWall extends Component {

    state = {
      title: "",
      subtitle: "",
      httpResponse: null,
       };
  
    formRef = React.createRef();
  
    componentDidMount() {
      apiHandler
        .getWall()
        .then((apiResp) => {
          console.log(apiResp)
          const postToEdit = apiResp.filter(
            (post) => post._id === this.props.match.params.id
            
          );
          console.log(postToEdit)
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
        .editWall(this.state.id, fd)
        .then((data) => {
          this.props.history.push("/wall");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    // handleFileSelect = ({ tmpUrl, file }) => {
    //   this.setState({ image: file });
    // };
  
    render() {
      return (
        <div className="ItemForm-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <h2 className="myplantstitle">Edit this Post</h2>
  
            <div className="form-group">
              <label className="labelplant" htmlFor="name">
                Title
              </label>
              <input
                id="title"
                name="title"
                className="inputplant"
                placeholder="Post title"
                type="text"
                onChange={this.handleChange}
                defaultValue={this.state.title}
              />
            </div>
  
            <div className="form-group">
              <label className="labelplant" htmlFor="description">
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                className="inputplant"
                placeholder="About this picture"
                onChange={this.handleChange}
                defaultValue={this.state.subtitle}
              ></input>
            </div>
  
            <div>
            <input
            className="fileplant"
              type="file"
              name="image"
              onChange={this.handleChange}
          
            ></input>
          </div>
  
            <button className="btn-submit">Save Changes</button>
          </form>
        </div>
      );
    }
  }
  
  export default withRouter(FormEditWall);