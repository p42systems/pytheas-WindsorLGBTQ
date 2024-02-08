import { Suspense } from "react";
import { Route, Switch } from "wouter";
import { ErrorBoundary } from "react-error-boundary";

import Introduction from "./Introduction/Introduction";
import Content from "./Content/Content";
import Home from "./Home/Home";
import Tour from "./Tour/Tour";
import Loading from "./General/Loading";
import GenericError from "./General/GenericError";

function Routes() {
  return (
    <Switch>
      <Route path="/notfound">
        <GenericError />
      </Route>
      <Route path="/list">
        <ErrorBoundary FallbackComponent={GenericError}>
          <Suspense fallback={<Loading />}>
            <Content />
          </Suspense>
        </ErrorBoundary>
      </Route>
      <Route path="/">
        <ErrorBoundary FallbackComponent={GenericError}>
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        </ErrorBoundary>
      </Route>
      <Route path="/about">
        <ErrorBoundary FallbackComponent={GenericError}>
          <Suspense fallback={<Loading />}>
            <Introduction />
          </Suspense>
        </ErrorBoundary>
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
