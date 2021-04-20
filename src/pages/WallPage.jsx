import React from "react";
import Wall from "../components/Wall/Wall";
import Users from "../components/Users/Users";
import MapPage from "./MapPage";
function WallPage() {
  return (
    <div className="wallpagecss">
      <Users />
      <div className="wallfuldiv">
        <Wall />
      </div>
    </div>
  );
}

export default WallPage;
