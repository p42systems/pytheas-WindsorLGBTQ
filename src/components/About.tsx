import { RefObject } from "react";
import { AboutParagraph, AboutAnchorHeader } from "./styled_components";

function About(props: { aboutRef: RefObject<HTMLHeadingElement> }) {
  return (
    <section>
      <AboutAnchorHeader id="about" ref={props.aboutRef}>
        About the Site
      </AboutAnchorHeader>
      <AboutParagraph>
        The historical research and organizing impetus for this tour was
        provided by Walter Cassidy of the Windsor Essex Rainbow Alliance (WERA).
        The tour app was built using the Pytheas project. This open-source code
        was provided to the community by Parallel 42 Systems based on their work
        with the McDougall Corridor tour app, built in partnership with the
        Essex County Black Historical Research Society, the Windsor Law Centre
        for Cities, the School of Creative Arts (SOCA), and Leddy Library, with
        funding provided by Canada's federal government through the Canadian
        Urban Institute.
        <br />
        <br />
        The work of implementing Queer Walk was performed by Dana Teagle, Haley
        Tibbitts, and Zhenia Tomé, with funding and support from Parallel 42
        Systems and Windsor Hackforge.
      </AboutParagraph>
    </section>
  );
}

export default About;
