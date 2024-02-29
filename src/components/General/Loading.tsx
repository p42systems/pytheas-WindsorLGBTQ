import {
  CenterAllContainer,
  CenterImgContainer,
  LoaderAnimation,
} from "../styled_components";

function Loading() {
  return (
    <CenterAllContainer>
      <CenterImgContainer>
        <img width="100%" src="/loading-black.png" alt="The tour is loading" />
        <LoaderAnimation />
      </CenterImgContainer>
    </CenterAllContainer>
  );
}

export default Loading;
