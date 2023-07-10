import { useLocation } from "wouter";
import { useAtom } from "jotai";
import { isDropDownAtom, getDropDownAtom} from "../atoms";

import {
  NavigationButtonsContainer,
  NavigationDropDownContainer,
  NavigationOptionsContainer,
  NavigationContentButton,
  NavigationDropDownButton,
  DropDownOptionButton,
} from "./styled_components";

function NavigationButtons() {
  const [, setLocation] = useLocation();
  const [isDropDown, setIsDropDown] = useAtom(isDropDownAtom);
  const [dropDownVisibility] = useAtom(getDropDownAtom);
  
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
        <NavigationDropDownButton
          title="Choose Tour"
          aria-label="Choose Tour"
        >
          Choose Tour
        </NavigationDropDownButton>
        <NavigationOptionsContainer style={{display: dropDownVisibility}}>
          <DropDownOptionButton
            title="Full Tour"
            aria-label="Full Tour"
            onClick={() => {
              setLocation("/tour");
            }}
          >
            Full Tour
          </DropDownOptionButton>
          <DropDownOptionButton
            title="Walking Tour"
            aria-label="Walking Tour"
            onClick={() => {
              setLocation("/tour");
            }}
          >
            Walking Tour
          </DropDownOptionButton>
        </NavigationOptionsContainer>
      </NavigationDropDownContainer>
    </NavigationButtonsContainer>
  );
}

export default NavigationButtons;
