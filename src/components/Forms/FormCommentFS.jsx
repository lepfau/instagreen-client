import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

class FormComment extends Component {
  state = {
    text: "",
    id_wall: this.props.postId,
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ text: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const commentData = this.state;
    apiHandler.addComment(this.props.postId, commentData).then((data) => {
      console.log(data);
      this.setState({
        text: "",
      });
      this.props.seeNewComment();
    });
  };

  render() {
    return (
      <div className="commentForm">
        <div style={{ display: "flex", width: "100%" }}>
          <div className="ppusercontainercomment ">
            <img src={this.props.userpic} className="ppwall " alt="userpic" />
          </div>
          <form
            className="commentform"
            style={{ width: "100%" }}
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="comment"></label>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Comment this"
              id="comment2"
              name="text"
              value={this.state.text}
            ></input>
            <button
              className="commentsubbtn"
              style={{ height: "30px", width: "30px" }}
            >
              <i className="fas fa-location-arrow"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormComment);
