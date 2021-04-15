import React from "react";
import AppMap from "../components/Map/AppMap";
import ItemDisplay from "../components/Map/ItemDisplay";
import ItemForm from "../components/Map/ItemForm";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  static contextType = UserContext;
  state = {
    selectedItem: null,
    items: [],
    formView: false,
  };

  componentDidMount() {
    apiHandler.getItems().then((data) => {
      this.setState({ items: data });
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
    this.setState({ formView: true });
  };

  closeForm = () => {
    this.setState({ formView: false });
  };

  render() {
    const { user } = this.context;

    return (
      <div>
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
          {" "}
          <button
            onClick={this.displayForm}
            style={{ position: "fixed", top: "60px", right: "20px" }}
          >
            Proposer une bouture
          </button>{" "}
        </div>
      </div>
    );
  }
}

export default Home;
