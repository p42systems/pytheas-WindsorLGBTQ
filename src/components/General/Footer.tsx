import {
  CopyRightContainer,
  FooterContainer,
  FooterSubBar,
  FooterSubBarContainer,
} from "../styled_components";

function Footer() {
  return (
    <FooterContainer>
      <FooterSubBar>
        <FooterSubBarContainer>
          <CopyRightContainer>
            Copyright &copy; {new Date().getFullYear()}
          </CopyRightContainer>
        </FooterSubBarContainer>
      </FooterSubBar>
    </FooterContainer>
  );
}

export default Footer;
