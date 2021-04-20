import React from "react";
import Wall from "../components/Wall/Wall";
import Users from "../components/Users/Users";
import MapPage from "./MapPage";
function WallPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <Users />
      <div className="wallfuldiv">
        <Wall />
      </div>
    </div>
  );
}

export default WallPage;
