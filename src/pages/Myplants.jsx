import React, { Component } from "react";
import FormCreatePlant from "../components/Forms/FormCreatePlant";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

class Myplants extends Component {
  //STATE INITIAL REMPLACE PAR COMPONENT DID MOUNT
  state = {
    plants: [],
    date: "",
  };

  //AFFICHER PLANTES SUR LA PAGE DEPUIS LA DB
  componentDidMount() {
    apiHandler
      .getPlants()
      .then((apiResp) => {
        console.log(apiResp);
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

  addItem = (plant) => {
    this.setState({ plants: [...this.state.plants, plant] });
  };

  deleteItem = (itemId) => {
    apiHandler.deleteItem(itemId).then(() => {
      this.setState({
        plants: this.state.plants.filter((it) => it._id !== itemId),
      });
    });
  };

  waterDate = (itemId) => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "-" + dd + "-" + yyyy;
    console.log(today);
    today = mm + "/" + dd + "/" + yyyy;
    console.log(today);
    today = dd + "-" + mm + "-" + yyyy;
    console.log(today);
    today = mm + "/" + dd + "/" + yyyy;

    apiHandler.editItem(itemId, { waterDate: today }).then((data) => {
      apiHandler
        .getPlants()
        .then((apiResp) => {
          console.log(apiResp);
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
    });
  };

 
 
  render() {
    return (
      <div>
        {" "}
        <FormCreatePlant addItem={this.addItem} />
        <h1>My plants</h1>
        <div className="plantcards">
          {this.state.plants.map((plant) => {
            return (
            
              <div className="plantcard"  key={plant._id}>
                
                <p className="plantcardname">{plant.name}</p>
                <img className="plantcardimage" src={plant.image} />
                <p className="plantcardinfo">
                  Enlightment: {plant.enlightment}
                </p>
                <p className="plantcardinfo">Watering: {plant.watering}</p>
                <p className="plantcardinfo">
                  Water interval: {plant.wateringinterval} days
                </p>

               <p className="plantcardinfo">
                  Last watering: {plant.waterDate}{" "}
                </p>
                <button
                  onClick={() => {
                    this.deleteItem(plant._id);
                  }}
                >
                  Delete
                </button>
                <button>
                  <Link to={`/plant/edit/${plant._id}`}>Edit</Link>
                </button>
                <button
                  onClick={() => {
                    this.waterDate(plant._id);
                  }}
                >
                  Give me water !
                </button>
              </div>
              
            );
          })}
        </div>
      </div>
    );
  }
}
export default withUser(Myplants);
