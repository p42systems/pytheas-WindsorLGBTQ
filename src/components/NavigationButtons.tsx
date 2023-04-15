import { useLocation } from "wouter";

import {
  NavigationButtonsContainer,
  NavigationContentButton,
  NavigationButton,
} from "./styled_components";

function NavigationButtons() {
  const [, setLocation] = useLocation();
  return (
    <NavigationButtonsContainer>
      <NavigationContentButton
        title="Content"
        aria-label="Content"
        onClick={() => {
          setLocation("/list");
        }}
      >
        Content
      </NavigationContentButton>
      <NavigationButton
        title="Take the tour"
        aria-label="Take the tour"
        onClick={() => {
          setLocation("/tour");
        }}
      >
        Take Tour
      </NavigationButton>
    </NavigationButtonsContainer>
  );
}

export default NavigationButtons;
