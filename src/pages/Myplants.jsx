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

  setWaterDate = (itemId) => {
    var now = dayjs();
    apiHandler.editItem(itemId, { waterDate: now }).then((data) => {
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
              var GivenDate = new Date(`${plant.waterDate}`);

              var CurrentDate = new Date();
              CurrentDate.setDate(
                CurrentDate.getDate() - `${plant.wateringinterval}`
              );

              if (GivenDate < CurrentDate) {
                console.log("La plante a besoin d'eau");
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
                    <div className="round-image-plant">
                      <img
                        className="plantcardimage"
                        src={plant.image}
                        alt="plant"
                      />
                    </div>
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
                        this.setWaterDate(plant._id);
                      }}
                    >
                      Give water <i className="fas fa-tint"></i>
                    </button>
                    <div
                      style={{
                        textAlign: "center",
                        margin: "15px",
                        color: "red",
                      }}
                    >
                      <img
                        style={{ height: "16px" }}
                        src="https://static.wixstatic.com/media/595488_898025ed38bb4367827dca2895d87d12~mv2.gif/v1/fit/w_445%2Ch_410%2Cal_c%2Cq_80/file.gif"
                      ></img>
                      <span> I need water !</span>
                    </div>
                  </div>
                );
              } else {
                console.log("La plante n'a pas besion d'eau");
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

                    <div className="round-image-plant">
                      <img
                        className="plantcardimage"
                        src={plant.image}
                        alt="plant"
                      />
                    </div>

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
                        this.setWaterDate(plant._id);
                      }}
                    >
                      Give water <i className="fas fa-tint"></i>
                    </button>
                    <div
                      style={{
                        textAlign: "center",
                        margin: "15px",
                        color: "green",
                      }}
                    >
                      <i className="fas fa-check-circle"></i>No water needed
                    </div>
                  </div>
                );
              }
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
