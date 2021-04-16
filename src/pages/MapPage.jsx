import React, { useEffect } from "react";
import AppMap from "../components/Map/AppMap";
import ItemDisplay from "../components/Map/ItemDisplay";
import ItemForm from "../components/Map/ItemForm";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";

class MapPage extends React.Component {
  static contextType = UserContext;
  state = {
    formView: false,
    selectedItem: null,
    items: [],
  };

  componentDidMount() {
    apiHandler
      .getItems()
      .then((data) => {
        this.setState({ items: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addItem = (item) => {
    this.setState({ items: [...this.state.items, item] });
  };

  onSelectItem = (selectedItem) => {
    this.setState({ selectedItem: selectedItem });
  };

  handleClose = () => {
    this.setState({ selectedItem: null });
  };

  displayForm = () => {
    console.log("click");
    this.setState({ formView: !this.state.formView });
  };

  closeForm = () => {
    this.setState({ formView: false });
  };

  render() {
    const { user } = this.context;

    return (
      <React.Fragment>
        <div>
          {user && this.state.formView && (
            <ItemForm handleClose={this.closeForm} addItem={this.addItem} />
          )}
          {this.state.selectedItem !== null && (
            <ItemDisplay
              item={this.state.selectedItem}
              handleClose={this.handleClose}
            />
          )}
          <AppMap
            items={this.state.items}
            handleSelectItem={this.onSelectItem}
          />
        </div>
        <div>
          <button
            className="addplantbtn"
            onClick={this.displayForm}
            style={{ position: "fixed", top: "60px" }}
          >
            Give a plant cut !
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default MapPage;
