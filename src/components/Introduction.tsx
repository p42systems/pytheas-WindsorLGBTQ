import { icon, LatLng } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useLocation } from "wouter";
import { useAtomValue } from "jotai";

import { baseIconConfigAtom } from "../atoms";
import {
  MainContainer,
  BackButton,
  AboutParagraph,
  AboutHeader,
  SmallMapContainer,
  AboutAnchorHeader,
  StatictourButtonButton,
  StaticcontentButtonButton,
  StaticheaderBackgroundButton,
  GeneralLink,
} from "./styled_components";
import ZoomControls from "./ZoomControls";
import Header from "./Header";
import Footer from "./Footer";

const interactionOptions = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: true,
  touchZoom: false,
  scrollWheelZoom: false,
};

const PARKING_LATLNG = new LatLng(-83.03334838413619, 42.31617694568193);

function Introduction() {
  const baseIconConfig = useAtomValue(baseIconConfigAtom);
  const [, setLocation] = useLocation();
  return (
    <>
      <Header size="short">
        <BackButton
          title="Back"
          aria-label="Back"
          onClick={() => {
            if (window.history.length > 0) {
              window.history.back();
            } else {
              setLocation("/");
            }
          }}
        >
          Back
        </BackButton>
      </Header>
      <MainContainer>
        <article>
          <AboutHeader>Information about the Tour</AboutHeader>
          <ul>
            <li>
              <GeneralLink href="#how-to-take-the-tour">
                How to Take the Tour
              </GeneralLink>
            </li>
            <li>
              <GeneralLink href="#about">
                About the Site
              </GeneralLink>
            </li>
            <li>
              <GeneralLink href="#statement">
                A Statement from Walter Cassidy
              </GeneralLink>
            </li>
            <li>
              <GeneralLink href="#references">
                References
              </GeneralLink>
            </li>
            <li>
              <GeneralLink href="#parking">
                Transit Access & Available Parking
              </GeneralLink>
            </li>
          </ul>

          <section>
            <AboutAnchorHeader id="how-to-take-the-tour">
              How to Take the Tour
            </AboutAnchorHeader>
            <AboutParagraph>
              If you choose to take the tour, please allow yourself{" "}
              <strong>between 2.5-3 hours</strong> to complete the walking tour
              all in one visit. You can start the tour by pressing the{" "}
              <StaticcontentButtonButton>Take Tour</StaticcontentButtonButton> button. You
              may choose to only do a portion of the tour and come back at a
              later time. The tour will remember which markers you have already
              visited and allow you to begin where you left off.
            </AboutParagraph>
            <AboutParagraph>
              The first stop on the tour is at{" "}
              <strong>
                first marker location 
              </strong>
              . From there the map will prompt you to the next stop with an
              orange marker. You may choose to visit any marker at any time but
              the loop we have curated will help you visit every stop in an
              efficient manner. Completed stops are noted with green pins and
              remaining stops are noted with blue pins. To mark content as
              completed, press the{" "}
              <StaticheaderBackgroundButton>Mark as completed</StaticheaderBackgroundButton>{" "}
              check box on the content page.
            </AboutParagraph>
            <AboutParagraph>
              Not able to walk the tour? All materials are available at any
              time, simply click the{" "}
              <StatictourButtonButton>Content</StatictourButtonButton> button to
              watch at your own pace.
            </AboutParagraph>
          </section>

          <section>
            <AboutAnchorHeader id="about">
              About the Site
            </AboutAnchorHeader>
            <AboutParagraph>
            The historical research and organizing impetus for this tour was provided by Walter Cassidy of the Windsor Essex Rainbow Alliance (WERA). The tour app was built using the Pytheas project. This open-source code was provided to the community by Parallel 42 Systems based on their work with the McDougall Corridor tour app, built in partnership with the Essex County Black Historical Research Society, the Windsor Law Centre for Cities, the School of Creative Arts (SOCA), and Leddy Library, with funding provided by Canada's federal government through the Canadian Urban Institute.<br/><br/>
            The work of implementing Queer Walk was performed by Dana Teagle, Haley Tibbitts, and Zhenia Tomé, with funding and support from Parallel 42 Systems and Windsor Hackforge.
            </AboutParagraph>
          </section>

          <section>
            <AboutAnchorHeader id="statement">
              A Statement from Walter Cassidy
            </AboutAnchorHeader>
            <AboutParagraph>
              The key to this walking tour is basic. It is about local visibility of the 2SLGBTQAI community. Unfortunately, much of that visibility has been erased for various reasons. Some of those reasons are as simple as the suppression of our identities, the lack of interest in who we are, overall hate or ignorance, and our own lack of seeing the importance of our stories and struggles.<br/><br/>
              When creating the tour, some of the examples were difficult to prove if they “really” were queer, trans, or gender non-conforming references, especially before the 1960s. I included them anyways because one could argue either way if the experience was queer, trans, or gender non-conforming.<br/><br/>
              I must acknowledge the hard work and dedication of the Windsor Essex Rainbow Alliance (WERA). WERA is a group of individuals whose goals are to institute a method of collecting, preserving, and disseminating the local history of the 2SLGBTQIA+ community and to establish a permanent public monument that will showcase the struggles, achievements, and celebrations of the local 2SLGBTQIA+ community for all in Windsor/Essex and beyond to visit, learn from, and enjoy. There are still so many voices, stories, and places that have not been told and could be lost forever. It is my goal to help change that reality.<br/><br/>
              If you have any materials (newsletters, pictures, posters, buttons, shirts, etc.) you would like to have preserved or if you find any information that is not included in this tour and would like to make a request for an update or something changed, please contact me <a href="mailto:wequeerhistory@mdirect.net">by email</a>.
            </AboutParagraph>
          </section>

          <section>
            <AboutAnchorHeader id="references">
              References
            </AboutAnchorHeader>
            <AboutParagraph>
              <ul>
                <li>Voice of the Fugitive: 1851 Sandwich-Windsor by Henry and Mary Bibb</li>
                <li>Windsor Star (And various other names by same publishing company)</li>
                <li>Windsor Gay Unity Newsletter 1974-1979</li>
                <li>International Justice Monthly: 1981-82 Publisher Jack Summer Editor: E. Leon Bushey</li>
                <li>Outspoken: 1991 to 2005 Original Staff: Barry Adam, Gilles Brunet, Wayne Tennant Editor: Kenn Stanton</li>
                <li>Out and Aging: Our Stories. Edited by Barbara Zarzosa:2010: Windsor Pride Community</li>
                <li>The Body Politic 1971-1987. Toronto: Pink Triangle Press</li>
                <li>Information was also collected by firsthand interviews or conversations with: Jim Monk, Beth Lyster, Robin Sherman, Julie Fraser, Dr. Kael Sharman, Neil Mens, Paulette Kupnicki, Peter Sonnberg Schmidt, Dennis A. Dowker, Joe McParland, Dani Bobb, Julie Leadbetter, Harold Desmarais, Barry Adam, Nancy Campana, Michael Venus, Amanda Gellman, Mary Lou Gelissen, and Steven Lough</li>
              </ul>
            </AboutParagraph>
          </section>

          <section>
            <AboutAnchorHeader id="parking">
              Transit Access & Available Parking
            </AboutAnchorHeader>
            <AboutParagraph>
              Looking for a place to park? 
            </AboutParagraph>
            <SmallMapContainer>
              <MapContainer
                center={[PARKING_LATLNG.lng, PARKING_LATLNG.lat]}
                style={{ width: "100%", height: "100%" }}
                zoom={16}
                zoomControl={false}
                {...interactionOptions}
              >
                <ZoomControls minZoom={14} maxZoom={18} />

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  minZoom={14}
                  maxZoom={18}
                />

                <Marker
                  position={[PARKING_LATLNG.lng, PARKING_LATLNG.lat]}
                  key={"parking"}
                  icon={icon(baseIconConfig)}
                  interactive={false}
                ></Marker>
              </MapContainer>
            </SmallMapContainer>
          </section>

        </article>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Introduction;
