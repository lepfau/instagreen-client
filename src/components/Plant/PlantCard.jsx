import React from "react";
import { Link } from "react-router-dom";

function PlantCard(plant) {
  function handleDelete(id) {
    plant.deleteItem(id);
  }

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
              handleDelete(plant);
            }}
            className="fas fa-trash"
          ></i>
        </div>
      </div>

      <img className="plantcardimage" src={plant.image} alt="plant" />
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
          <b> Last watering:</b> {plant.waterDate}{" "}
        </p>
      </div>
      <button
        className="givemewater"
        onClick={() => {
          plant.waterDate(plant._id);
        }}
      >
        Water me ! <i className="fas fa-hand-holding-water"></i>
      </button>
    </div>
  );
}

export default PlantCard;
