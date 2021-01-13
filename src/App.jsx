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
import Map from "./pages/Exchangemap"

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/wall" component={Wall} />
        <ProtectedRoute exact path="/myplants" component={Myplants}/>
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/greenclinic" component={Greenclinic} />
        <ProtectedRoute exact path="/map" component={Map} />
      </Switch>
    </div>
  );
}

export default App;
