import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import OneProfileWall from "../components/Wall/OneProfileWall";

class OneUser extends Component {
  state = {
    plant: [],
    user: "",
  };

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }

  componentDidMount() {
    apiHandler.getUser(this.props.match.params.id).then((apiResp) => {
      console.log(apiResp);
      this.setState({
        user: apiResp,
      });
    });

    apiHandler.getPlants().then((apiResp) => {
      const userPlants = apiResp.filter(
        (userplant) => userplant.id_user === this.props.match.params.id
      );

      this.setState({
        plant: userPlants,
      });
    });
  }

  render() {
    return (
      <div className="oneuserbody">
        <div className="usernameppfu">
          <div className="ppusercontainer2">
            <img
              className="ppwall"
              src={this.state.user.profileImg}
              alt="userpic"
            />
          </div>
          <h1 key={this.state.user._id} className="userpagetitle">
            {this.state.user.firstName}
          </h1>
        </div>
        <div className="flexuserpage">
          <div className="userplantspartleft">
            <h1 className="userpageplantstitle">User plants</h1>

            <div className="usersplants">
              {this.state.plant > 0 ? (
                this.state.plant.map((plant) => {
                  return (
                    <div key={plant._id} className="userplantsbody">
                      <div className="userplantscontainer" key={plant._id}>
                        <p className="userplantname">{plant.name}</p>
                        <img
                          className="userplantimage"
                          src={plant.image}
                          alt="plantimg"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="noplants">
                  User has no plants registered for now...
                </p>
              )}
            </div>
          </div>
          <div className="userplantspartright">
            <h1 className="userpageplantstitle">User Posts</h1>
            <OneProfileWall user={this.props.match.params.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(OneUser);
