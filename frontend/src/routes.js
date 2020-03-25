import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./screens/Logon";
import Register from "./screens/Register";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
