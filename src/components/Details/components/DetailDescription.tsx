import { useAtomValue } from "jotai";
import { detailsQueryAtom } from "../../../atoms";
import { DetailsContentContainer } from "../../styled_components";

function DetailDescription() {
  const detail = useAtomValue(detailsQueryAtom);
  return (
    <DetailsContentContainer>
      {typeof detail.description === "string" ? (
        <p>{detail.description}</p>
      ) : (
        detail.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))
      )}
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
