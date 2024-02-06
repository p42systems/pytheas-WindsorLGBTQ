import { useAtomValue } from "jotai";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, Redirect, Route, Switch } from "wouter";

import { getViewControllerStateAtom } from "../../atoms";
import GenericError from "../General/GenericError";
import TourError from "./components/TourError";
import MarkerMap from "./components/MarkerMap/MarkerMap";
import Details from "../Details/Details";
import {
  AppContainer,
  ContentButton,
  ErrorMessage,
  StaticContentButton,
} from "../styled_components";
import Loading from "../General/Loading";
import BoundingBoxMap from "./components/BoundingBoxMap/BoundingBoxMap";

function Tour() {
  const [, setLocation] = useLocation();
  const state = useAtomValue(getViewControllerStateAtom);

  return (
    <Switch>
      <Route path="/tour/details/:id">
        {(params) => {
          if (params.id != null) {
            return (
              <ErrorBoundary FallbackComponent={GenericError}>
                <Suspense fallback={<Loading />}>
                  <Details />
                </Suspense>
              </ErrorBoundary>
            );
          } else {
            return <Redirect to={"/notfound"} />;
          }
        }}
      </Route>
      <Route path="/tour">
        {state.matches("starting") ? <Loading /> : null}

        {state.matches("noBoundingBox") ? <GenericError /> : null}

        {state.matches("noUserLocation") ? (
          <ErrorBoundary FallbackComponent={GenericError}>
            <TourError>
              <ErrorMessage>
                For the tour to function correctly, it needs your access to your
                location.
              </ErrorMessage>
              <ErrorMessage>
                If you do not want to share your location but still want to view
                the content, then click on the{" "}
                <StaticContentButton>Content</StaticContentButton> button below.
              </ErrorMessage>
              <ErrorMessage>
                Otherwise, please refresh the page and when the browser
                permission popup shows, click on Allow.
              </ErrorMessage>
              <ContentButton
                onClick={() => {
                  setLocation("/list");
                }}
              >
                Content
              </ContentButton>
            </TourError>
          </ErrorBoundary>
        ) : null}

        {state.matches("withinBounds") ? (
          <ErrorBoundary FallbackComponent={GenericError}>
            <Suspense fallback={<Loading />}>
              <AppContainer>
                <MarkerMap />
              </AppContainer>
            </Suspense>
          </ErrorBoundary>
        ) : null}

        {state.matches("outsideBounds") ? (
          <ErrorBoundary FallbackComponent={GenericError}>
            <TourError>
              <ErrorMessage>
                You are outside of the geo-fence. Please enter the area shown
                below and refresh the page.
              </ErrorMessage>
              <BoundingBoxMap />
              <ErrorMessage>
                If you are unable to get the the area shown above, then you can
                still see the content by click on the{" "}
                <StaticContentButton>Content</StaticContentButton> button below.
              </ErrorMessage>
              <ContentButton
                onClick={() => {
                  setLocation("/list");
                }}
              >
                Content
              </ContentButton>
            </TourError>
          </ErrorBoundary>
        ) : null}
      </Route>
    </Switch>
  );
}

export default Tour;
