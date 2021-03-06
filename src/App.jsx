import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/Divers/NavMain";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Myplants from "./pages/Myplants";
import ProtectedRoute from "./components/Divers/ProtectedRoute";
import Profile from "./pages/Profile";
import FormEditPlant from "./components/Forms/FormEditPlant";
import FormEditWall from "./components/Forms/FormEditWall";
import OneUser from "./pages/OneUser";
import UserPage from "./pages/UserPage";
import WallPage from "./pages/WallPage";
import MapPage from "./pages/MapPage";
import UpdateUser from "./components/Forms/UpdateUser";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/wall" component={WallPage} />
        <ProtectedRoute exact path="/myplants" component={Myplants} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profileupdate" component={UpdateUser} />
        <ProtectedRoute
          exact
          path="/plant/edit/:id"
          component={FormEditPlant}
        />
        <ProtectedRoute exact path="/wall/edit/:id" component={FormEditWall} />

        <ProtectedRoute exact path="/users" component={UserPage} />
        <ProtectedRoute exact path="/users/:id" component={OneUser} />
        <ProtectedRoute exact path="/map" component={MapPage} />
      </Switch>
    </div>
  );
}

export default App;
