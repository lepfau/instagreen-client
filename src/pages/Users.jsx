import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
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
        const filteredUser = apiResp.filter(user => {
            return (user.firstName.toLowerCase().includes(this.state.inputValue.toLowerCase()))})
     console.log(this.state.inputValue)
      this.setState({
        users: filteredUser,
      });
    });

  }

  userFilterOnChange = (event) => {
      this.setState({
          inputValue: event.target.value
      })
  }


  submitSearch = (event) => {
      event.preventDefault();
    apiHandler.getUsers().then((apiResp) => {
        const filteredUser = apiResp.filter(user => {
            return (user.firstName.toLowerCase().includes(this.state.inputValue.toLowerCase()))})
     console.log(this.state.inputValue)
      this.setState({
        users: filteredUser,
      });
    });

  }
//   searchUser = (evt) => {
//       evt.prevenDefault()
// apiHandler
// .searchUsers(evt)
// .then((apiResp) => {
//     console.log(apiResp.data)
// this.setState({
//     foundUsers: apiResp.data
// })
// })
//   }


//   handleChange = (event) => {
//     const key = event.target.name;
//     const value = event.target.value;

//     console.log(key, value);
//     this.setState({ [key]: value });
//   };
//   showUserPlants = (userId) => {
//       apiHandler
//       .getPlants()
//       .then((apiResp) => {
//          console.log(userId)
//           const userPlants = apiResp.filter(
//               (plant) => plant.id_user === userId
//           );
         
//           this.setState({
//               plants: userPlants
//           })

//       });

//   }

  render() {


    return (
      <div>
<form onSubmit={this.submitSearch}>
          <label htmlFor="search">Search by name</label>
          <input type="text" value={this.state.inputValue} onChange={this.userFilterOnChange}/>
          </form>

        <h1>Users list</h1>
        {this.state.users.map((user) => {
          return (
            <div key={user._id}>
                <div className="ppusercontainer">
              <img className="ppwall" src={user.profileImg} />
             </div>
              <p>  <Link to={`/users/${user._id}`}>
              {user.firstName}
                    </Link></p>
          
              <hr></hr>
            </div>
          );
        })}
      </div>
    );
  }
}
