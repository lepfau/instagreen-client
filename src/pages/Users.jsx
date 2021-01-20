import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

export default class Users extends Component {
  state = {
    users: [],
    plants: []
  };

  componentDidMount() {
    apiHandler.getUsers().then((apiResp) => {
      this.setState({
        users: apiResp,
      });
    });

  }

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
