import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

class FormComment extends Component {
  state = {
    comments: [],
    userCommenting: ""
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

    const commentData = this.state.comments;

    apiHandler
      .editWall(this.props.postId, { $push: { 
        comments: commentData } })
      .then((data) => {
        console.log(data);
 
      });

  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="comment"></label>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Comment this"
            id="comment"
            name="comments"
          ></input>
          <button>Post comment!</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormComment);