import { useContext } from "react";
import { useLocation } from "wouter";

import { ConfigContext } from "../../services/configContext";
import {
  HeaderBackgroundImage,
  HeaderContainer,
  HelpLink,
  HeaderImage,
  HeaderSubBar,
  HeaderTopBar,
  HeaderSubBarContainer,
  HeaderHelpLinkContainer,
} from "../styled_components";

import bgImage from "/bg_main.jpg";

import { HeaderProps } from "../../types";

function Header({ size = "long", children }: HeaderProps) {
  const config = useContext(ConfigContext);
  const [, setLocation] = useLocation();
  return (
    <HeaderContainer>
      <HeaderBackgroundImage size={size} backgroundImage={bgImage}>
        <HeaderTopBar>
          <HeaderHelpLinkContainer>
            <HelpLink
              title="More Information"
              onClick={() => {
                setLocation("/about");
              }}
            />
          </HeaderHelpLinkContainer>
        </HeaderTopBar>
        <a
          onClick={() => {
            setLocation("/");
          }}
        >
          <HeaderImage src={config.logo.src} alt={config.logo.src} />
        </a>
      </HeaderBackgroundImage>
      <HeaderSubBar>
        <HeaderSubBarContainer>{children}</HeaderSubBarContainer>
      </HeaderSubBar>
    </HeaderContainer>
  );
}

export default Header;
