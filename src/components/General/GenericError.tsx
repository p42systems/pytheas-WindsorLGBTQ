import { useLocation } from "wouter";

import {
  BackButton,
  ErrorMessage,
  WarningImageContainer,
  CenterAllContainer,
  CenterImgContainer,
} from "../styled_components";

function GenericError() {
  const [, setLocation] = useLocation();

  return (
    <CenterAllContainer>
      <WarningImageContainer>
        <img
          width="35px"
          height="31px"
          src="/icons/warning.svg"
          alt="An error has occured"
        />
      </WarningImageContainer>
      <CenterImgContainer>
        <img width="100%" src="/icons/404.svg" alt="404 page not found" />
      </CenterImgContainer>
      <ErrorMessage>Something went wrong.</ErrorMessage>
      <ErrorMessage>
        Click on the back button to go to the previous page.
      </ErrorMessage>
      <BackButton
        onClick={() => {
          setLocation("/list");
        }}
      >
        Back
      </BackButton>
    </CenterAllContainer>
  );
}

export default GenericError;
