import React, { Component } from "react";
import FormCreatePlant from "../components/Forms/FormCreatePlant";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import dayjs from "dayjs";

class Myplants extends Component {
  //STATE INITIAL REMPLACE PAR COMPONENT DID MOUNT
  state = {
    plants: [],
    date: "",
    showForm: false,
  };

  showForm = () => {
    if (this.state.showForm === false) {
      this.setState({ showForm: true });
    } else {
      this.setState({ showForm: false });
    }
  };

  //AFFICHER PLANTES SUR LA PAGE DEPUIS LA DB
  componentDidMount() {
    apiHandler
      .getUserPlants()
      .then((apiResp) => {
        this.setState({
          plants: apiResp,
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
    var now = dayjs();

    apiHandler.editItem(itemId, { waterDate: now }).then((data) => {
      apiHandler
        .getUserPlants()
        .then((apiResp) => {
          console.log(apiResp);
          this.setState({
            plants: apiResp,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  render() {
    const { showForm } = this.state;
    return (
      <div className="myplantspage">
        {" "}
        {/* <FormCreatePlant addItem={this.addItem} /> */}
        <h1 className="myplantstitle">My plants</h1>
        <button className="addplantbtn" onClick={() => this.showForm()}>
          Add a new plant
        </button>
        {showForm && <FormCreatePlant addItem={this.addItem} />}
        <div className="plantcards">
          {this.state.plants.length > 0 ? (
            this.state.plants.map((plant) => {
              return (
                <div className="plantcard" key={plant._id}>
                  <div className="plantcardtop">
                    <p className="plantcardname">{plant.name}</p>
                    <div className="plantcardtopbtn">
                      <Link to={`/plant/edit/${plant._id}`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <i
                        onClick={() => {
                          this.deleteItem(plant._id);
                        }}
                        className="fas fa-trash"
                      ></i>
                    </div>
                  </div>

                  <img
                    className="plantcardimage"
                    src={plant.image}
                    alt="plant"
                  />
                  <div className="plantcardallinfo">
                    <p className="plantcardinfo">
                      <b>Enlightment</b>: {plant.enlightment}
                    </p>
                    <p className="plantcardinfo">
                      <b>Watering: </b>
                      {plant.watering}
                    </p>
                    <p className="plantcardinfo">
                      <b> Water interval:</b> {plant.wateringinterval} days
                    </p>
                    <br></br>
                    <p className="plantcardinfo">
                      <b> Last watering:</b> {plant.waterDate.slice(0, 10)}
                    </p>
                  </div>
                  <button
                    className="givemewater"
                    onClick={() => {
                      this.waterDate(plant._id);
                    }}
                  >
                    Water me ! <i className="fas fa-hand-holding-water"></i>
                  </button>
                </div>
              );
            })
          ) : (
            <p className="noplants">No plants added for now...</p>
          )}
        </div>
      </div>
    );
  }
}
export default withUser(Myplants);
