import { useAtomValue } from "jotai";
import { detailsQueryAtom } from "../../../atoms";
import { DetailsContentContainer } from "../../styled_components";

function DetailDescription() {
  const detail = useAtomValue(detailsQueryAtom);
  console.log(detail);
  return (
    <DetailsContentContainer>
      {detail.description ? (
        typeof detail.description === "string" ? (
          <p>{detail.description}</p>
        ) : (
          detail.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        )
      ) : null}
      {detail.timeline ? (
        <>
          <hr />
          <h3>{detail.timeline.header}:</h3>
          <ul>
            {detail.timeline.list.map((listItem, index) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
        </>
      ) : null}
    </DetailsContentContainer>
  );
}

export default DetailDescription;
