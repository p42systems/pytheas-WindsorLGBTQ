import { Suspense } from "react";
import { Route, Switch } from "wouter";
import { ErrorBoundary } from "react-error-boundary";

import Introduction from "./Introduction";
import MarkerList from "./MarkerList";
import Home from "./Home";
import Tour from "./Tour";
import Loading from "./Loading";
import GenericError from "./GenericError";

function Routes() {
  return (
    <Switch>
      <Route path="/notfound">
        <GenericError />
      </Route>
      <Route path="/list">
        <ErrorBoundary FallbackComponent={GenericError}>
          <Suspense fallback={<Loading />}>
            <MarkerList />
          </Suspense>
        </ErrorBoundary>
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about">
        <Introduction />
      </Route>
      <Route path="/tour/:rest*">
        <Tour />
      </Route>
      <Route path="/:rest*">
        <GenericError />
      </Route>
    </Switch>
  );
}

export default Routes;
