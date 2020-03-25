import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./screens/Logon";
import Register from "./screens/Register";
import Profile from "./screens/Profile";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
