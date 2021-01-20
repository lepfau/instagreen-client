import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Myplants from "./pages/Myplants"
import Greenclinic from "./pages/Greenclinic"
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Wall from "./pages/Wall"
import Map from "./pages/Exchangemap";
import FormEditPlant from "./components/Forms/FormEditPlant";
import FormEditWall from "./components/Forms/FormEditWall";
import DbFormPlant from "./pages/DbFormPlant"
import Users from "./pages/Users"
import OneUser from "./pages/OneUser"

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/wall" component={Wall} />
        <ProtectedRoute exact path="/myplants" component={Myplants}/>
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/greenclinic" component={Greenclinic} />
        <ProtectedRoute exact path="/map" component={Map} />
        <ProtectedRoute exact path="/plant/edit/:id" component={FormEditPlant} />
        <ProtectedRoute exact path="/wall/edit/:id" component={FormEditWall} />
        <Route exact path="/dbplantcreate" component={DbFormPlant} />
        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/users/:id" component={OneUser} />

      </Switch>
    </div>
  );
}

export default App;
