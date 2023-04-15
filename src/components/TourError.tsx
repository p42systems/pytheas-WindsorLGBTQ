import { WarningImageContainer, CenterAllContainer } from "./styled_components";

interface TourErrorProps {
  size?: "short" | "long";
  children?: React.ReactNode | React.ReactNode[];
}

function TourError({ children }: TourErrorProps) {
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
      {children}
    </CenterAllContainer>
  );
}

export default TourError;
