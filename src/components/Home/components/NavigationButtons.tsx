import { useLocation } from "wouter";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  isDropDownAtom,
  getDropDownAtom,
  tourPreferenceAtom,
} from "../../../atoms";

import {
  NavigationButtonsContainer,
  NavigationDropDownContainer,
  NavigationOptionsContainer,
  NavigationContentButton,
  NavigationDropDownButton,
  DropDownOptionButton,
} from "../../styled_components";

import { loadTour } from "../../../services/navigation";

function NavigationButtons() {
  const [, setLocation] = useLocation();
  const [isDropDown, setIsDropDown] = useAtom(isDropDownAtom);
  const setTourPreference = useSetAtom(tourPreferenceAtom);

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
      <NavigationDropDownContainer
        onClick={() => {
          setIsDropDown(!isDropDown);
        }}
      >
        <NavigationDropDownButton title="Choose Tour" aria-label="Choose Tour">
          Choose Tour
        </NavigationDropDownButton>
        <NavigationOptionsContainer
          style={{ display: useAtomValue(getDropDownAtom) }}
        >
          <DropDownOptionButton
            title="Full Tour"
            aria-label="Full Tour"
            onClick={() => {
              loadTour("full", setTourPreference, setLocation);
            }}
          >
            Full Tour
          </DropDownOptionButton>
          <DropDownOptionButton
            title="Walking Tour"
            aria-label="Walking Tour"
            onClick={() => {
              loadTour("walking", setTourPreference, setLocation);
            }}
          >
            Walking Tour
          </DropDownOptionButton>
          <DropDownOptionButton
            title="Guided Bus Tour"
            aria-label="Guided Bus Tour"
            onClick={() => {
              loadTour("bus", setTourPreference, setLocation);
            }}
          >
            Guided Bus Tour
          </DropDownOptionButton>
        </NavigationOptionsContainer>
      </NavigationDropDownContainer>
    </NavigationButtonsContainer>
  );
}

export default NavigationButtons;
