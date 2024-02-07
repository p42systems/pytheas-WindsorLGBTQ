class IntroServices {
  relLinkCount = 0;

  scrollIntoView(props: React.RefObject<HTMLHeadingElement>) {
    props.current?.scrollIntoView({ behavior: "smooth" });
  }

  clickLink(ref: React.RefObject<HTMLHeadingElement>) {
    this.relLinkCount++;
    this.scrollIntoView(ref);
  }

  backCheck(setLocation: any) {
    if (this.relLinkCount && window.history.length > 0) {
      window.history.go(-this.relLinkCount - 1);
    } else {
      back(setLocation);
    }
  }
}

export const intro = new IntroServices();

export const loadTour = (
  preference: string,
  setTourPreference: any,
  setLocation: any
) => {
  setTourPreference(preference);
  setLocation("/tour");
};

export const back = (setLocation: any) => {
  if (window.history.length > 0) {
    window.history.back();
  } else {
    setLocation("/");
  }
};
