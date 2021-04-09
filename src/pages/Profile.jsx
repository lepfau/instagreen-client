import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import ProfileWall from "../pages/ProfileWall";

class Profile extends Component {
  state = {
    plants: [],
  };

  componentDidMount() {
    apiHandler
      .getPlants()
      .then((apiResp) => {
        const userPlants = apiResp.filter(
          (plant) => plant.id_user === this.props.context.user._id
        );
        this.setState({
          plants: userPlants,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="fullbodyprofile">
        <h1 className="userpagetitle">My profile</h1>
        <div className="flexuserpageprofile">
          <div className="userplantspartleft">
            <h1 className="userpageplantstitle">My plants</h1>

            <div className="usersplants">
              {this.state.plants.map((plant) => {
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
              })}
            </div>
          </div>
          <div className="userplantspartright">
            <h1 className="userpageplantstitle"> My Posts</h1>
            <ProfileWall />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(Profile);
