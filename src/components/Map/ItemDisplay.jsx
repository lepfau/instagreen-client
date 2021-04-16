import React from "react";
import "../../styles/ItemDisplay.css";

const ItemDisplay = ({ item, handleClose }) => {
  return (
    <div className="Item-container">
      <p
        style={{ fontSize: "1em" }}
        onClick={handleClose}
        className="close-link"
      >
        Close
      </p>
      <div className="round-image">
        <img className="user-img" src={item.image} alt="item" />
      </div>
      <h2 className="title">{item.name}</h2>
      <div className="info">
        <span>Quantity: {item.quantity}</span>
      </div>
      <p style={{ alignSelf: "center", fontSize: "1em" }} className="location">
        {item.formattedAddress}
      </p>
      <div className="user-info">
        <div className="round-image-user">
          <img src={item.id_user.profileImg} alt="user" />
        </div>
        <span>Given away by {item.id_user.firstName}</span>
      </div>
      <div className="contact-information">Contact: {item.phone}</div>
    </div>
  );
};

export default ItemDisplay;
