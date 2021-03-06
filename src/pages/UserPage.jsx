import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

export default class UserPage extends Component {
  state = {
    users: [],
    plants: [],
    foundUsers: [],
    sortValue: "",
    inputValue: "",
  };

  componentDidMount() {
    apiHandler.getUsers().then((apiResp) => {
      const filteredUser = apiResp.filter((user) => {
        return user.firstName
          .toLowerCase()
          .includes(this.state.inputValue.toLowerCase());
      });

      this.setState({
        users: filteredUser,
      });
    });
  }

  userFilterOnChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  submitSearch = (event) => {
    event.preventDefault();
    apiHandler.getUsers().then((apiResp) => {
      const filteredUser = apiResp.filter((user) => {
        return user.firstName
          .toLowerCase()
          .includes(this.state.inputValue.toLowerCase());
      });

      this.setState({
        users: filteredUser,
        inputValue: "",
      });
    });
  };

  render() {
    return (
      <div>
        <div className="fulluserpagebody2">
          <h1 className="myplantstitle">Users list</h1>

          <form className="searchformuserpage" onSubmit={this.submitSearch}>
            <input
              placeholder="Search user by name"
              className="inputplant"
              type="text"
              value={this.state.inputValue}
              onChange={this.userFilterOnChange}
            />
          </form>
          <div className="userpagebodyuserpage">
            <div className="allusercontainerpage">
              {this.state.users.map((user) => {
                return (
                  <div key={user._id} className="usercontainerwidth">
                    <div className="usercontainerpage" key={user._id}>
                      <div className="ppusercontainer">
                        <img
                          className="ppwall"
                          src={user.profileImg}
                          alt="userpic"
                        />
                      </div>
                      <p>
                        {" "}
                        <Link to={`/users/${user._id}`}>
                          {" "}
                          <b>
                            {user.firstName} {user.lastName}{" "}
                          </b>
                        </Link>
                      </p>
                    </div>
                    <hr className="hruser"></hr>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
