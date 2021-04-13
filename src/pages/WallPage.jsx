import React from "react";
import Wall from "../components/Wall/Wall";
import Users from "../components/Users/Users";

function WallPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <Users />
      <Wall />
    </div>
  );
}

export default WallPage;
