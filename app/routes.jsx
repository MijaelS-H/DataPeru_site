import React from "react";
import {Route, IndexRoute, browserHistory} from "react-router";
import {Builder, Profile} from "@datawheel/canon-cms";

import {App} from "./App";
import {Home} from "./pages/Home";

/**
 * Returns the React tree which will be rendered by the App.
 * @returns {JSX.Element}
 */
function createRoute() {
  return (
    <Route path="/" component={App} history={browserHistory}>
      <IndexRoute component={Home} />
      <Route path="/profile/:slug/:id" component={Profile} />

      <Route path="/auth" component={Builder} />
    </Route>
  );
}

export default createRoute;
