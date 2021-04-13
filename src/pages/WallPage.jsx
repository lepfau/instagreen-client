import React from "react";
import Wall from "../components/Wall/Wall";
import Users from "../components/Users/Users";

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
      <div style={{ marginTop: "90px" }}>
        {" "}
        <Wall />
      </div>
    </div>
  );
}

export default WallPage;
