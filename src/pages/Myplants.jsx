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
    showForm: false,
  };

  showForm = () => {
    if (this.state.showForm === false) {
      this.setState({ showForm: true });
    } else {
      this.setState({ showForm: false });
    }
  };

  renderForm() {
    return <FormCreatePlant addItem={this.addItem} />;
  }

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
    this.setState({ plants: [...this.state.plants, plant], showForm: false });
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
    const { showForm } = this.state;
    return (
      <div className="myplantspage">
        {" "}
        {/* <FormCreatePlant addItem={this.addItem} /> */}
        <h1 className="myplantstitle">My plants</h1>
        <button className="addplantbtn" onClick={() => this.showForm()}>
          Add a new plant
        </button>
        {showForm && this.renderForm()}
        <div className="plantcards">
          {this.state.plants.map((plant) => {
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

                <img className="plantcardimage" src={plant.image} />
                <div className="plantcardallinfo">
                <p className="plantcardinfo">
                 <b>Enlightment</b>: {plant.enlightment}
                </p>
                <p className="plantcardinfo"><b>Watering: </b>{plant.watering}</p>
                <p className="plantcardinfo">
                <b> Water interval:</b> {plant.wateringinterval} days
                </p>
<br></br>
                <p className="plantcardinfo">
                <b> Last watering:</b> {plant.waterDate}{" "}
                </p>
</div>
                <button className="givemewater"
                  onClick={() => {
                    this.waterDate(plant._id);
                  }}
                >
                  Water me ! <i className="fas fa-hand-holding-water"></i>
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
