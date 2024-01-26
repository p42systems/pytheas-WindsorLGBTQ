import { RefObject } from "react";
import { AboutList, AboutAnchorHeader } from "./styled_components";

function References(props: { referencesRef: RefObject<HTMLHeadingElement> }) {
  return (
    <section>
      <AboutAnchorHeader id="references" ref={props.referencesRef}>
        References
      </AboutAnchorHeader>
      <AboutList>
        <li>
          Voice of the Fugitive (1851, Sandwich-Windsor publication by Henry and
          Mary Bibb)
        </li>
        <li>Cruise Magazine (published by Tony Rome Enterprises)</li>
        <li>Metra Magazine (published by Metra Inc.)</li>
        <li>Windsor Star (and various other publications by same publisher)</li>
        <li>Detroit Free Press</li>
        <li>Toronto Telegram</li>
        <li>Globe and Mail</li>
        <li>Windsor Gay Unity Newsletter (1974-1979)</li>
        <li>
          International Justice Monthly (1981-1982, published by Jack Summer,
          and edited by E. Leon Bushey)
        </li>
        <li>
          Outspoken (1991-2005, contributions from Barry Adam, Gilles Brunet,
          and Wayne Tennant, and edited by Kenn Stanton)
        </li>
        <li>
          Out and Aging: Our Stories (2010: Windsor Pride Community, edited by
          Barbara Zarzosa)
        </li>
        <li>
          The Body Politic (1971-1987, published by the Toronto-based Pink
          Triangle Press)
        </li>
        <li>
          Information and artifacts were also collected by firsthand interviews,
          collections or correspondences with Jim Monk, Lorriane Sayell, Beth
          Lyster, Harold Desmarias, Robin Sherman, Jill Gamble, Julie Fraser,
          Dr. Kael Sharman, Neil Mens, Paulette Kupnicki, Ginny Lundgren, Peter
          Sonnberg Schmidt, Dennis A. Dowker, John Shelhorn, Anna Kovinsky,
          Jamie Pitts, Caroline Carnerie, Dion Carter, Diana Mady Kelly, Diana
          Flemming Luke Maddaford, Joe McParland, Dani Bobb, Julie Leadbetter,
          Harold Desmarais, Wayne Tennant, Barry Adam, Robert Katzman, Colleen
          Gallagher, Nancy Campana, Tom Marchell, Michael Venus, Camil Jacques,
          David M Lyons-Black, Amanda Gellman, Mary Lou Gelissen, Marie-France
          Jean, June Willier, and Steven Lough
        </li>
      </AboutList>
    </section>
  );
}

export default References;
