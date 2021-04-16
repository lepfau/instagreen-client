import React, { Component } from "react";
import AutoCompleteSearch from "./AutoCompleteSearch";

export class SearchbarMap extends Component {
  state = {
    location: { coordinates: [] },
  };

  handlePlace = (place) => {
    const location = place.geometry;
    this.setState({ location, formattedAddress: place.place_name });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          position: "fixed",
          left: "400px",
          top: "90px",
          zIndex: "3",
          width: "400px",
        }}
      >
        <AutoCompleteSearch onSelect={this.handlePlace} />
        <button
          style={{
            height: "30px",
            width: "45px",
            background: "#4a7f37",
            borderRadius: "8px",
            border: "none",
            color: "white",
          }}
          onClick={() => this.props.handleSearchChange(this.state.location)}
        >
          Go
        </button>
      </div>
    );
  }
}

export default SearchbarMap;
