import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { react as reactRoute } from "../config";

const App = () => {
  return (
    <Router>
      <Switch>
        {reactRoute.map(({ route, component }, index) => (
          <Route path={route} component={component} key={index}></Route>
        ))}
      </Switch>
    </Router>
  );
};

export default App;
