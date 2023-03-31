import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { react as reactRoute } from "../config";
import modlues from "./utils";
import './test.ts';

const App = () => {
  return (
    <Router>
      <Switch>
        {reactRoute.map(({ route, component }, index) => (
          <Route
            path={route}
            component={modlues[component]?.default}
            key={index}
          ></Route>
        ))}
      </Switch>
    </Router>
  );
};

export default App;
