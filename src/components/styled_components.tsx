import styled from "@emotion/styled";
import { TourStates } from "../types";
import { Link } from "wouter";
import { CarouselProvider, Image as CarouselImage, ButtonFirst, ButtonBack, ButtonNext, ButtonLast, Dot, DotGroup } from 'pure-react-carousel';

// This should always be the first style component
export const AppContainer = styled.div((props) => ({
  // Setting height to 100% should fix the overlapping bottom nav bar on iOS
  // see: https://dev-tips.com/css/overlapping-bottom-navigation-bar-despite-100vh-in-ios-safari
  height: "100%",
  overflow: "hidden",
  backgroundColor: props.theme.colors.background,
}));

export const MainContainer = styled.main(() => ({
  margin: "25px auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignSelf: "stretch",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "100%",
  "@media screen and (min-width: 769px)": {
    width: "769px",
  },
  "@media screen and (max-width: 600px)": {
    width: "100vw",
    padding: "0px 10px",
    boxSizing: "border-box",
  },
  minWidth: "375px",
}));

export const ListMainContainer = styled.main(() => ({
  margin: "25px auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignSelf: "stretch",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "100%",
  "@media screen and (min-width: 1028px)": {
    width: "1028px",
  },
  "@media screen and (max-width: 800px)": {
    width: "100vw",
  },
  minWidth: "375px",
}));

export const FirstParagraph = styled.p((props) => ({
  margin: "1rem",
  fontWeight: 700,
  fontSize: "1.2rem",
  color: props.theme.colors.headerBackground,
  "@media screen and (max-width: 600px)": {
    textAlign: "center",
  },
}));

export const HomeParagraph = styled.p(() => ({
  margin: "1rem",
  lineHeight: "1.5rem",
  "@media screen and (max-width: 600px)": {
    textAlign: "center",
  },
}));

export const GeneralLink = styled(Link)((props) => ({
  color: props.theme.colors.headerBackground,
  transition: "all 100ms",
  "&:hover": {
    color: props.theme.colors.suggestedMarker,
  },
  "&:visited": {},
}));

export const Button = styled.button((props) => ({
  backgroundColor: props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  cursor: "pointer",
  fontWeight: 700,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  minHeight: "2rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  transition: "all 200ms",
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
}));

export const StaticheaderBackgroundButton = styled.span((props) => ({
  backgroundColor: props.theme.colors.headerBackground,
  color: props.theme.colors.background,
  textTransform: "uppercase",
  fontSize: "0.9rem",
  fontWeight: 900,
  border: `2px solid ${props.theme.colors.background}`,
  borderRadius: "5px",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  whiteSpace: "nowrap",
}));

export const StatictourButtonButton = styled.span((props) => ({
  backgroundColor: props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  fontSize: "0.9rem",
  fontWeight: 900,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  whiteSpace: "nowrap",
}));

export const StaticcontentButtonButton = styled.span((props) => ({
  backgroundColor: props.theme.colors.contentButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  fontSize: "0.9rem",
  fontWeight: 900,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  whiteSpace: "nowrap",
}));

export const CardsContainer = styled.div(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
}));

export const ListParagraph = styled.p(() => ({
  margin: "1rem",
  textAlign: "center",
  lineHeight: "1.5rem",
}));

export const CardContainer = styled.article((props) => ({
  display: "grid",
  minHeight: "150px",
  maxHeight: "175px",
  minWidth: "300px",
  maxWidth: "325px",
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  margin: "0.5rem",
  gap: "0.5rem 0.5rem",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "1fr",
  position: "relative",
  backgroundColor: props.theme.colors.tourButton,
}));

export const CardState = styled.div(() => ({
  position: "absolute",
  right: 0,
  top: 0,
}));

export const CardImage = styled.img(() => ({
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 1,
  width: "100px",
  height: "100%",
  objectFit: "cover",
  overflow: "hidden",
}));

export const CardContent = styled.div(() => ({
  gridColumnStart: 2,
  gridColumnEnd: 4,
  gridRowStart: 1,
  gridRowEnd: 1,
  display: "grid",
  gridTemplateColumns: "40% 0.5em 55%",
  gridTemplateRows: "60% 20% 20%",
  gap: "0px 0px",
  width: "200px",
  height: "150px",
  paddingBottom: "0.25rem",
  paddingRight: "0.1rem",
}));

export const CardButtons = styled.div(() => ({
  display: "flex",
  justifyContent: "space-evenly",
  padding: "1rem",
}));

export const CardHeader = styled.h2(() => ({
  fontSize: "1.1rem",
  textAlign: "left",
  paddingRight: "0.1rem",
  gridColumnStart: 1,
  gridColumnEnd: 4,
  gridRowStart: 1,
  gridRowEnd: 1,
}));

export const Address = styled.address(() => ({
  fontSize: "0.75rem",
  fontStyle: "normal",
  fontWeight: 500,
  "&:before": {
    content: `url("/icons/location_beige.svg")`,
    margin: "0.25rem",
    position: "relative",
    top: "2px",
    left: 0,
  },
}));

export const CardAddress = styled(Address)(() => ({
  gridColumnStart: 1,
  gridColumnEnd: 4,
  gridRowStart: 2,
  gridRowEnd: 2,
  "&:before": {
    content: `url("/icons/location.svg")`,
  },
}));

export const CardButton = styled(Button)((props) => ({
  margin: "0",
  minHeight: "1rem",
  padding: "0.2rem 0.4rem 0.2rem 0.4rem",
  border: `2px solid ${props.theme.colors.background}`,
  borderRadius: "5px",
  color: props.theme.colors.background,
  fontWeight: 900,
  backgroundColor: props.theme.colors.headerBackground,
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
}));

export const ViewCardButton = styled(CardButton)(() => ({
  gridColumnStart: 1,
  gridColumnEnd: 1,
  gridRowStart: 3,
  gridRowEnd: 3,
}));

export const TourCardButton = styled(CardButton)(() => ({
  gridColumnStart: 3,
  gridColumnEnd: 3,
  gridRowStart: 3,
  gridRowEnd: 3,
}));

export const AboutParagraph = styled.p((props) => ({
  padding: "0.25rem 0.75rem 0 0.75rem",
  color: props.theme.colors.headerBackground,
}));

export const AboutHeader = styled.h1((props) => ({
  padding: "0.75rem",
  fontSize: "1.9rem",
  textAlign: "center",
  color: props.theme.colors.headerBackground,
}));

export const AboutAnchorHeader = styled.h2((props) => ({
  padding: "0 0 0 0.75rem",
  margin: "0.25rem 0 0.25rem 0",
  fontSize: "1.25rem",
  color: props.theme.colors.headerBackground,
}));

export const HomeSubHeader = styled.h2((props) => ({
  padding: "0 0 0 1rem",
  margin: "2rem 0 0.25rem 0",
  fontSize: "1.25rem",
  color: props.theme.colors.headerBackground,
  "@media screen and (max-width: 600px)": {
    textAlign: "center",
  },
}));

export const TourMainContainer = styled.main(() => ({
  margin: "auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  alignSelf: "stretch",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "100%",
  width: "100vw",
  minWidth: "375px",
}));

export const MapAppicationContainer = styled.div(() => ({
  position: "relative",
  flexGrow: 1,
  flexShrink: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  overflow: "hidden",
  "@media screen and (max-height: 600px) and (orientation:landscape)": {
    flexDirection: "row",
  },
}));

export const LargeMapContainer = styled.div(() => ({
  "@media screen and (min-width: 600px) and (orientation:portrait)": {
    height: "100%",
    width: "100%",
  },
  "@media screen and (max-width: 600px) and (orientation:portrait)": {
    flex: "2 0 auto",
  },
  "@media screen and (min-height: 600px) and (orientation:landscape)": {
    height: "100%",
    width: "100%",
  },
  "@media screen and (max-height: 600px) and (orientation:landscape)": {
    flex: "2 0 auto",
  },
}));

export const MapOverlayContainer = styled.div(() => ({
  zIndex: "1000",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "row",
  "@media screen and (min-width: 600px) and (orientation:portrait)": {
    margin: "0 1rem 2rem 1rem",
    position: "absolute",
    bottom: "0",
    left: "0",
  },
  "@media screen and (max-width: 600px) and (orientation:portrait)": {
    margin: "0.25rem",
  },
  "@media screen and (min-height: 600px) and (orientation:landscape)": {
    margin: "0 1rem 2rem 1rem",
    position: "absolute",
    bottom: "0",
    left: "0",
  },
  "@media screen and (max-height: 600px) and (orientation:landscape)": {
    margin: "0.25rem",
    flex: "0 2",
  },
}));

export const MapOverlay = styled.div((props) => ({
  borderRadius: "5px",
  minHeight: "1rem",
  backgroundColor: props.theme.colors.headerBackground,
  color: props.theme.colors.background,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0.75rem 2rem 0.75rem 2rem",
  minWidth: "300px",
  maxWidth: "675px",
  transition: "all 200ms",
  "@media screen and (max-height: 600px) and (orientation:landscape)": {
    alignSelf: "stretch",
    margin: 0,
    minHeight: "300px",
  },
}));

export const MarkerCardHeader = styled.h2<{
  extra: boolean;
  color: TourStates;
}>((props) => ({
  minHeight: "1rem",
  fontSize: "1.5rem",
  textAlign: "left",
  padding: 0,
  margin: 0,
  fontWeight: 900,
  color: props.theme.colors.background,
  "&:after": {
    content: `"${props.extra ? "[ OPTIONAL ]" : ""}"`,
    whiteSpace: "nowrap",
    fontSize: "0.8rem",
    fontWeight: 200,
    fontFamily: `"Roboto", sans-serif`,
    color:
      props.color === "selected"
        ? props.theme.colors.accent
        : props.color === "suggested"
        ? props.theme.colors.suggestedMarker
        : props.color === "welcome"
        ? props.theme.colors.contentButton
        : props.theme.colors.tourButton,
    verticalAlign: "middle",
    marginLeft: "0.5rem",
  },
}));

export const MarkerCardAddress = styled(Address)<{
  color: TourStates;
}>((props) => ({
  color:
    props.color === "selected"
      ? props.theme.colors.accent
      : props.color === "suggested"
      ? props.theme.colors.suggestedMarker
      : props.color === "welcome"
      ? props.theme.colors.contentButton
      : props.theme.colors.tourButton,
  "&:before": {
    content:
      props.color === "selected"
        ? `url("/icons/location_beige.svg")`
        : props.color === "suggested"
        ? `url("/icons/location_glacier.svg")`
        : props.color === "welcome"
        ? `url("/icons/location_contentButton.svg")`
        : `url("/icons/location_pine.svg")`,
    margin: "0.25rem 0.25rem 0.25rem 0",
  },
}));

export const MarkerCardState = styled.span<{
  color: TourStates;
}>((props) => ({
  minHeight: "1rem",
  fontSize: "1rem",
  textAlign: "left",
  padding: "0.5rem 0 0 0",
  color:
    props.color === "selected"
      ? props.theme.colors.accent
      : props.color === "suggested"
      ? props.theme.colors.suggestedMarker
      : props.color === "welcome"
      ? props.theme.colors.contentButton
      : props.theme.colors.tourButton,
}));

export const MarkerNavigation = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "min-content minmax(50%, 100%)",
  gridTemplateRows: "75px",
  gap: "0px 1rem",
  height: "auto",
}));

export const MarkerCardTextContainer = styled.div(() => ({
  gridColumnStart: 2,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const MarkerCardText = styled.p(() => ({
  display: "inline-block",
  verticalAlign: "middle",
  fontSize: "0.75rem",
  margin: 0,
  padding: 0,
}));

export const MarkerButtonContainer = styled.div(() => ({
  gridColumnStart: 1,
  gridColumnEnd: 1,
  gridRowStart: 1,
  gridRowEnd: 1,
  display: "flex",
  alignItems: "center",
}));

export const MarkerButton = styled(Button)<{
  color: TourStates;
}>((props) => ({
  margin: "0 0.2rem 0 0.2rem",
  display: "flex",
  alignItems: "center",
  fontSize: "0.9rem",
  cursor: "pointer",
  backgroundColor:
    props.color === "selected"
      ? props.theme.colors.accent
      : props.color === "suggested"
      ? props.theme.colors.suggestedMarker
      : props.color === "welcome"
      ? props.theme.colors.contentButton
      : props.theme.colors.tourButton,
  ":before": {
    content: `""`,
    marginRight: "0.25rem",
    marginLeft: "-0.25rem",
    width: "0.9rem",
    height: "0.9rem",
    backgroundImage: `url("/icons/back.svg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
}));

export const StaticMakerButton = styled.span<{
  color: TourStates;
}>((props) => ({
  display: "inline-block",
  backgroundColor:
    props.color === "selected"
      ? props.theme.colors.accent
      : props.color === "suggested"
      ? props.theme.colors.suggestedMarker
      : props.color === "welcome"
      ? props.theme.colors.contentButton
      : props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  fontSize: "0.7rem",
  fontWeight: 900,
  border: `1px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "4px",
  paddingLeft: "0.25rem",
  paddingRight: "0.25rem",
  whiteSpace: "nowrap",
}));

export const MarkerTitle = styled.h2((props) => ({
  fontSize: "1.2rem",
  margin: "1rem 0 1rem 0",
  color: props.theme.colors.background,
}));

export const SectionContentContainer = styled.section(() => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "stretch",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "100%",
}));

export const ToggleText = styled.span<{ enabled: boolean }>((props) => ({
  color: props.enabled
    ? props.theme.colors.contentButton
    : props.theme.colors.tourButton,
  fontWeight: "bolder",
}));

export const ControlLoadingContainer = styled.div(() => ({
  height: "26px",
  width: "26px",
  display: "flex",
  padding: "2px",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderBottom: "1px solid #ccc",
}));

export const MapControlErrorMessageContainer = styled.div(() => ({
  display: "flex",
  padding: "2px",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
}));

export const MapControlErrorMessage = styled.span((props) => ({
  color: props.theme.colors.contentButton,
  padding: "2px",
}));

export const DetailsImage = styled.img((props) => ({
  maxWidth: "100%",
  padding: "5px",
  height: "100%",
  backgroundColor: `${props.theme.colors.suggestedMarker}`,
  border: `5px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  objectFit: "cover",
}));

export const DetailsCarousel = styled(CarouselProvider)((props) => ({
  padding: "5px",
  backgroundColor: `${props.theme.colors.suggestedMarker}`,
  border: `5px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
}));

export const DetailsCarouselImage = styled(CarouselImage)(() => ({
  maxHeight: "600px",
  cursor: "initial",
  maxWidth: "100%",
  objectFit: "cover",
}));

export const CarouselButtonFirst = styled(ButtonFirst)((props) => ({
  backgroundColor: props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  cursor: "pointer",
  fontWeight: 700,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  minHeight: "2rem",
  marginTop: "5px",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  transition: "all 200ms",
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "initial",
    "&:hover": {
      backgroundColor: props.theme.colors.tourButton,
    }
  }
}));

export const CarouselButtonBack = styled(ButtonBack)((props) => ({
  backgroundColor: props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  cursor: "pointer",
  fontWeight: 700,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  minHeight: "2rem",
  marginTop: "5px",
  marginLeft: "5px",
  marginRight: "5px",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  transition: "all 200ms",
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "initial",
    "&:hover": {
      backgroundColor: props.theme.colors.tourButton,
    }
  }
}));

export const CarouselButtonNext = styled(ButtonNext)((props) => ({
  backgroundColor: props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  cursor: "pointer",
  fontWeight: 700,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  minHeight: "2rem",
  marginTop: "5px",
  marginLeft: "5px",
  marginRight: "5px",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  transition: "all 200ms",
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "initial",
    "&:hover": {
      backgroundColor: props.theme.colors.tourButton,
    }
  }
}));


export const CarouselButtonLast = styled(ButtonLast)((props) => ({
  backgroundColor: props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  cursor: "pointer",
  fontWeight: 700,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  minHeight: "2rem",
  marginTop: "5px",
  marginLeft: "5px",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  transition: "all 200ms",
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "initial",
    "&:hover": {
      backgroundColor: props.theme.colors.tourButton,
    }
  }
}));

export const CarouselDotGroup = styled(DotGroup)((props) => ({
  "button": {
    border: `2px solid ${props.theme.colors.headerBackground}`,
    borderRadius: "10px",
    padding: "5px",
    marginRight: "5px",
    "&:hover, &:active": {
      backgroundColor: props.theme.colors.background,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "initial",
      "&:hover": {
        backgroundColor: props.theme.colors.tourButton,
      }
    }
  }
}));

export const DetailsContentContainer = styled.div(() => ({
  margin: "1rem 0",
  lineHeight: "1.5rem",
}));

export const DetailCheckboxContainer = styled.div(() => ({
  margin: "1rem 0.5rem 0 0.5rem",
}));

export const SmallMapContainer = styled.div(() => ({
  height: "300px",
  width: "100%",
  marginBottom: "1rem",
}));

export const FooterContainer = styled.footer((props) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "365px",
  margin: 0,
  padding: 0,
  alignItems: "center",
  backgroundColor: props.theme.colors.headerBackground,
}));

export const FooterSubBar = styled.div((props) => ({
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  verticalAlign: "middle",
  width: "100%",
  position: "relative",
  backgroundColor: props.theme.colors.headerBackground,
  color: props.theme.colors.background,
}));

export const FooterSubBarContainer = styled.div(() => ({
  display: "block",
  padding: "1rem 0",
  "@media screen and (min-width: 1028px)": {
    width: "1028px",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "@media screen and (max-width: 1028px)": {
    width: "100vw",
    flexDirection: "column-reverse",
    justifyContent: "left",
  },
  minWidth: "375px",
}));

export const CopyRightContainer = styled.span(() => ({
  display: "flex",
  justifyContent: "center",
  "@media screen and (max-width: 1028px)": {
    justifyContent: "flex-start",
    margin: "0 0 0 1rem",
  },
}));

export const SponsorPartnerContainer = styled.span(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "row",
  flexWrap: "wrap",
  overflow: "hidden",
  margin: "1rem 0 0 0",
}));

export const SponsorPartnerImg = styled.img<{ large: boolean }>((props) => ({
  padding: "0.25rem",
  margin: "0 0 1rem 0",
  "@media screen and (min-width: 600px)": {
    maxWidth: props.large ? "300px" : "150px",
    minWidth: props.large ? "200px" : "100px",
  },
  "@media screen and (max-width: 600px)": {
    maxWidth: props.large ? "300px" : "125px",
    minWidth: props.large ? "200px" : "50px",
  },
}));

export const SponsorDivider = styled.hr((props) => ({
  width: "95%",
  color: props.theme.colors.headerBackground,
}));

export const HeaderContainer = styled.header((props) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "365px",
  margin: 0,
  padding: 0,
  alignItems: "center",
  backgroundColor: props.theme.colors.headerBackground,
}));

export const HeaderBackgroundImage = styled.div<{
  size: "short" | "long";
  backgroundImage: string;
}>((props) => ({
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  "@media screen and (min-width: 1028px)": {
    height: props.size === "long" ? "400px" : "225px",
  },
  "@media screen and (max-width: 1028px)": {
    height: "225px",
  },
  position: "relative",
  backgroundImage: `url("${props.backgroundImage}")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

export const HeaderSubBar = styled.div((props) => ({
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  verticalAlign: "middle",
  width: "100%",
  position: "relative",
  backgroundColor: props.theme.colors.headerBackground,
  color: props.theme.colors.background,
}));

export const HeaderSubBarContainer = styled.div(() => ({
  display: "flex",
  alignItems: "flex-start",
  "@media screen and (min-width: 1028px)": {
    width: "1028px",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  "@media screen and (max-width: 1028px)": {
    width: "100vw",
    flexDirection: "column",
    justifyContent: "left",
  },
  minWidth: "375px",
}));

export const HeaderTopBar = styled.div(() => ({
  margin: "0 auto 0 auto",
  padding: "1rem 0 1rem 0",
  display: "flex",
  justifyContent: "flex-end",
  "@media screen and (min-width: 1028px)": {
    width: "1028px",
  },
  "@media screen and (max-width: 1028px)": {
    width: "100vw",
  },
  minWidth: "375px",
}));

export const DetailsPageButtonsContainer = styled.div(() => ({
  display: "flex",
  justifyContent: "end",
  flexDirection: "column",
}));

export const DetailsPageBackButtonContainer = styled.div(() => ({
  display: "flex",
  justifyContent: "end",
  "@media screen and (max-width: 600px)": {
    justifyContent: "start",
  },
}));

export const BackButton = styled(Button)((props) => ({
  margin: "1rem 0rem 1rem 1rem",
  display: "flex",
  alignItems: "center",
  fontSize: "0.9rem",
  cursor: "pointer",
  ":before": {
    content: `""`,
    marginRight: "0.25rem",
    marginLeft: "-0.25rem",
    width: "0.9rem",
    height: "0.9rem",
    backgroundImage: `url("/icons/back.svg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
}));

export const ContentButton = styled(Button)((props) => ({
  margin: "1rem 1rem 1rem 1rem",
  display: "flex",
  alignItems: "center",
  fontSize: "0.9rem",
  cursor: "pointer",
  ":before": {
    content: `""`,
    marginRight: "0.25rem",
    marginLeft: "-0.25rem",
    width: "0.9rem",
    height: "0.9rem",
    backgroundImage: `url("/icons/content.svg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
  "&:hover, &:active": {
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
}));

export const StaticContentButton = styled.span((props) => ({
  display: "inline-block",
  backgroundColor: props.theme.colors.tourButton,
  color: props.theme.colors.headerBackground,
  textTransform: "uppercase",
  fontSize: "0.9rem",
  fontWeight: 900,
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  whiteSpace: "nowrap",
}));

export const HeaderDetails = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  margin: "0rem 1rem 1rem 1rem",
  maxWidth: "783px",
}));

export const HeaderDetailsH2 = styled.h2((props) => ({
  fontSize: "2rem",
  color: props.theme.colors.background,
  flexShrink: 3,
  "@media screen and (min-width: 769px)": {
    margin: "1rem 0 0.25rem 0",
  },
  "@media screen and (max-width: 769px)": {
    margin: "0 0 0.25rem 0",
  },
}));

export const HeaderHelpLinkContainer = styled.div(() => ({
  marginLeft: "3rem",
  "@media screen and (max-width: 769px)": {
    marginRight: "2rem",
  },
}));

export const HelpLink = styled.a(() => ({
  display: "inline-block",
  cursor: "pointer",
  width: "39px",
  height: "39px",
  backgroundImage: `url("/icons/help.svg")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  transition: "all 200ms",
  "&:hover, &:active": {
    backgroundImage: `url("/icons/help_over.svg")`,
  },
}));

export const HeaderImage = styled.img(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "450px",
  height: "180px",
  margin: 0,
  padding: 0,
  transform: `translateY(calc(-180px / 2)) translateX(calc(-450px / 2))`,
  "@media screen and (max-width: 1028px)": {
    width: "300px",
    height: "120px",
    transform: `translateY(calc(-120px / 2)) translateX(calc(-300px / 2))`,
  },
}));

export const AboutButtonsContainer = styled.div(() => ({
  display: "flex",
  margin: "1rem 0 0 0",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  padding: 0,
  "@media screen and (min-width: 769px)": {
    width: "769px",
  },
  "@media screen and (max-width: 769px)": {
    width: "100vw",
  },
  minWidth: "375px",
}));

export const NavigationButtonsContainer = styled.nav(() => ({
  display: "flex",
  rowGap: "1rem",
  margin: "1rem 0 1rem 0",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  "@media screen and (min-width: 769px)": {
    width: "769px",
    padding: "0 1rem 0 0",
  },
  "@media screen and (max-width: 769px)": {
    width: "100vw",
  },
  minWidth: "375px",
}));

export const NavigationDropDownContainer = styled.div(() => ({
  display: "flex",
  rowGap: "1rem",
  flexDirection: "column",
  justifyContent: "space-evenly",
  flexGrow: 1,
  minWidth: "275px",
  maxWidth: "300px",
  flexShrink: 1,
}));

export const NavigationOptionsContainer = styled(NavigationDropDownContainer)(() => ({
  display: "none",
}));

export const NavigationButton = styled(Button)(() => ({
  flexGrow: 1,
  minWidth: "275px",
  maxWidth: "300px",
  border: "2px solid #191919",
  flexShrink: 1,
  alignSelf: "flex-start",
}));

export const NavigationContentButton = styled(NavigationButton)((props) => ({
  backgroundColor: props.theme.colors.contentButton,
}));

export const NavigationDropDownButton = styled(NavigationButton)((props) => ({
  backgroundColor: props.theme.colors.contentButton,
  width: '100%',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  ":after": {
    content: `""`,
    transform: "rotate(-90deg)",
    position: "absolute",
    right: "0.5rem",
    width: "0.9rem",
    height: "0.9rem",
    backgroundImage: `url("/icons/back.svg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
}));

export const DropDownOptionButton = styled(NavigationButton)(() => ({
  width: "100%",
}));



export const CenterAllContainer = styled.div(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
}));

export const CenterImgContainer = styled.div(() => ({
  "@media screen and (min-width: 1000px)": {
    width: "auto",
  },
  "@media screen and (max-width: 800px)": {
    width: "50vw",
  },
  minWidth: "365px",
  margin: "0 0 2rem 0",
}));

export const WarningImageContainer = styled.div(() => ({
  margin: "0 0 5rem 0",
}));

export const ErrorMessage = styled.p((props) => ({
  margin: "0 1rem 1rem 1rem",
  fontSize: "1rem",
  fontWeight: 700,
  fontFamily: "'Roboto Slab', serif",
  textAlign: "center",
  color: props.theme.colors.headerBackground,
}));

export const DirectionControlsContainer = styled.div((props) => ({
  margin: 0,
  display: "grid",
  gridTemplateColumns: "min-content 1fr",
  gridTemplateRows: "min-content",
  width: "100%",
  borderTop: "1px",
  borderTopColor: `${props.theme.colors.background}33`,
  borderTopStyle: "solid",
  padding: "0.75rem 0.25rem 0 0.25rem",
  marginTop: "0.25rem",
}));

export const DirectionParagraph = styled.p(() => ({
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  justifySelf: "right",
  gridColumnStart: 2,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 1,
}));

export const ZoomControlContainer = styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  margin: "0",
  border: `2px solid ${props.theme.colors.headerBackground}`,
  borderRadius: "5px",
  color: props.theme.colors.suggestedMarker,
  fontWeight: 900,
  backgroundColor: props.theme.colors.suggestedMarker,
  "& button:not(:last-of-type)": {
    borderBottom: `1px solid ${props.theme.colors.headerBackground}`,
  },
  "& button:last-of-type": {
    borderRadius: "0 0 2px 2px",
  },
  "& button:first-of-type": {
    borderRadius: "2px 2px 0 0",
  },
}));

export const ZoomButton = styled.button((props) => ({
  margin: "0",
  height: "28px",
  width: "28px",
  lineHeight: "28px",
  padding: "0.2rem",
  color: props.theme.colors.headerBackground,
  border: "none",
  borderRadius: "none",
  fontWeight: 900,
  backgroundColor: props.theme.colors.suggestedMarker,
  textAlign: "center",
  transition: "all 200ms",
  cursor: "pointer",
  "&:disabled": {
    backgroundColor: "#AAAAAA",
    color: `${props.theme.colors.headerBackground}44`,
    cursor: "default",
  },
  "&:not(:disabled)": {
    "&:hover, &:active": {
      color: props.theme.colors.background,
      backgroundColor: props.theme.colors.headerBackground,
    },
  },
}));

export const ZoomIn = styled.span(() => ({
  display: "block",
  margin: "0",
  height: "calc(28px - 0.4rem)",
  width: "calc(28px - 0.4rem)",
  fontWeight: 600,
  fontSize: "24px",
  position: "relative",
  transition: "all 200ms",
  "&:after": {
    content: `"+"`,
    position: "absolute",
    top: "-5px",
    left: "4px",
  },
}));

export const ZoomOut = styled.span(() => ({
  display: "block",
  margin: "0",
  height: "calc(28px - 0.4rem)",
  width: "calc(28px - 0.4rem)",
  fontWeight: 600,
  fontSize: "24px",
  position: "relative",
  transition: "all 200ms",
  "&:after": {
    content: `"-"`,
    position: "absolute",
    top: "-5px",
    left: "6px",
  },
}));

export const RefreshDirectionButton = styled(Button)((props) => ({
  margin: 0,
  padding: 0,
  minHeight: 0,
  height: "27px",
  width: "27px",
  border: `2px solid ${props.theme.colors.background}`,
  borderRadius: "5px",
  color: props.theme.colors.background,
  fontWeight: 900,
  backgroundColor: props.theme.colors.headerBackground,
  gridColumnStart: 1,
  gridColumnEnd: 1,
  gridRowStart: 1,
  gridRowEnd: 1,
  position: "relative",
  "&:after": {
    content: `url("/icons/reload_beige.svg")`,
    position: "absolute",
    top: "-1px",
    left: "-1px",
  },
  "&:hover, &:active": {
    "&:after": {
      content: `url("/icons/reload_violet.svg")`,
    },
    color: props.theme.colors.headerBackground,
    backgroundColor: props.theme.colors.background,
  },
}));

export const ToggleCheckbox = styled.input((props) => ({
  appearance: "none",
  width: "40px",
  height: "20px",
  transition: "all 200ms",
  position: "relative",
  borderRadius: "20px",
  marginRight: "0.30rem",
  cursor: "pointer",
  backgroundColor: props.theme.colors.background,
  "&:after": {
    content: `""`,
    position: "absolute",
    top: "1px",
    left: "2px",
    width: "18px",
    height: "18px",
    borderRadius: "18px",
    backgroundColor: "#777777",
    transition: "all 200ms",
  },
  "&:checked:after": {
    left: "calc(100% - 2px)",
    transform: "translateX(-100%)",
    backgroundColor: props.theme.colors.headerBackground,
  },
  "&:hover:after": {
    backgroundColor: "#898989",
  },
  "&:checked:hover:after": {
    backgroundColor: props.theme.colors.suggestedMarker,
  },
}));

export const ToggleCheckboxLabel = styled.label(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "uppercase",
  fontWeight: 700,
  margin: "0 0 0 0",
  fontSize: "0.9rem",
  position: "relative",
  cursor: "pointer",
  alignSelf: "right",
  justifySelf: "right",
  gridColumnStart: 2,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 1,
}));

export const CheckboxLabel = styled.label(() => ({
  display: "inline-block",
  textTransform: "uppercase",
  fontWeight: 700,
  margin: "0 0 1rem calc(1rem + 2px)",
  fontSize: "1rem",
  position: "relative",
  cursor: "pointer",
}));

export const CheckboxLabelText = styled.span(() => ({
  verticalAlign: "middle",
}));

export const Checkbox = styled.input((props) => ({
  appearance: "none",
  width: "25px",
  height: "25px",
  backgroundColor: props.theme.colors.headerBackground,
  border: `2px solid ${props.theme.colors.background}`,
  transition: "all 200ms",
  position: "relative",
  borderRadius: "5px",
  marginRight: "0.30rem",
  cursor: "pointer",
  verticalAlign: "middle",
  bottom: "1px",
  "&:hover": {
    backgroundColor: props.theme.colors.background,
    content: `url("/icons/checkmark.svg")`,
  },
  "&:checked:before": {
    content: `url("/icons/checkmark_beige.svg")`,
    position: "absolute",
    top: "4px",
    left: "1px",
  },
}));
