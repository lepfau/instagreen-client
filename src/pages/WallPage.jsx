import React from "react";
import Wall from "../components/Wall/Wall";
import Users from "../components/Users/Users";
import Homeplants from "../components/Users/Homeplants";
function WallPage() {
  return (
    <div className="wallpagecss">
      <Users />
      <div className="wallfuldiv">
        <Wall />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "300px",
          marginTop: "25px",
          position: "sticky",
          top: "80px",
        }}
      >
        <Homeplants />
      </div>
    </div>
  );
}

export default WallPage;
