import { CenterAllContainer, CenterImgContainer } from "./styled_components";

function Loading() {
  return (
    <CenterAllContainer>
      <CenterImgContainer>
        <img width="100%" src="/loading.gif" alt="The tour is loading" />
      </CenterImgContainer>
    </CenterAllContainer>
  );
}

export default Loading;
