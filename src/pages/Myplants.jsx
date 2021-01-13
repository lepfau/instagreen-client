import React, { Component } from "react";
import FormCreatePlant from "../components/Forms/FormCreatePlant";
import apiHandler from "../api/apiHandler";

class Myplants extends Component {
  state = {
    plants: [],
  };

  componentDidMount() {
    apiHandler.getPlants().then((respFromApi) => {
      this.setState({
        plants: respFromApi,
      });
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

  render() {
    return (
      <div>
        {" "}
        <FormCreatePlant addItem={this.addItem} />
        <h1>My plants</h1>
        {this.state.plants.map((plant) => {
          return (
            <div key={plant._id}>
              <p>{plant.name}</p>
              <img src={plant.image}/>
              <button
                onClick={() => {
                  this.deleteItem(plant._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  this.updateItem(plant._id);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Myplants;
