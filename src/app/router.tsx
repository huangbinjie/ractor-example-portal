import * as React from "react";
import { Router as ReactRouter, Switch, Route, Redirect } from "react-router-dom";
import { history } from "@app/stores/history.store";
import { Dashboard } from "@dashboard/index";
import { NoMatch } from "@app/pages/nomatch/nomatch";
import { NoPromission } from "@app/pages/nopromission/nomatch";

export function Router() {
  return (
    <ReactRouter history={history}>
      <Switch>
        <Redirect exact={true} path="/" to={{ pathname: "/system-dashboard" }} />
        <Route path="/system-dashboard" component={Dashboard} />
        <Route path="/promission-error" component={NoPromission} />
        <Route component={NoMatch} />
      </Switch>
    </ReactRouter>
  )
}
