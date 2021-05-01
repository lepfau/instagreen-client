import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

export default class Users extends Component {
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

      console.log(this.state.inputValue);
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
      console.log(this.state.inputValue);
      this.setState({
        users: filteredUser,
        inputValue: "",
      });
    });
  };

  render() {
    return (
      <div className="fulluserpagebody">
        <h1 className="myplantstitle">Users</h1>

        <form className="searchform" onSubmit={this.submitSearch}>
          <i className="fa fa-search"></i>
          <input
            placeholder="Search user by name"
            className="inputplant"
            type="text"
            value={this.state.inputValue}
            onChange={this.userFilterOnChange}
          />
        </form>
        <div className="userpagebody">
          <div className="allusercontainer">
            {this.state.users.map((user) => {
              return (
                <div key={user._id}>
                  <Link to={`/users/${user._id}`}>
                    <div className="usercontainer" key={user._id}>
                      <div className="ppusercontainer">
                        <img className="ppwall" src={user.profileImg} />
                      </div>
                      <p>
                        {" "}
                        <b>
                          {user.firstName} {user.lastName}{" "}
                        </b>
                      </p>
                    </div>
                  </Link>
                  <hr className="hruser"></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
