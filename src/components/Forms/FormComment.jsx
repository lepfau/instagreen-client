import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";

class FormComment extends Component {
  state = {
    text: "",
    id_wall: this.props.postId
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    console.log("--------" + key, value);

    this.setState({ text: value });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const commentData = this.state;
    apiHandler.addComment(commentData)
    .then((data) => {
      this.props.addCommentUpdate(data);
      this.setState({
        text: ""
      })
    })
    console.log("wowowow")
  };

  render() {
    return (
      <div className="commentForm">
     <div className="ppusercontainercomment "><img src={this.props.userpic} className="ppwall "/></div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="comment"></label>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Comment this"
            id="comment"
            name="text"
            value={this.state.text}
          ></input>
          <button class="commentsubbtn"><i class="fas fa-location-arrow"></i></button>
        </form>
        
      </div>
    );
  }
}

export default withRouter(FormComment);
