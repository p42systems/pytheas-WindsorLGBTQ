import {
  AboutParagraph,
  HomeParagraph,
  StaticcontentButtonButton,
  StaticheaderBackgroundButton,
  StatictourButtonButton,
} from "../styled_components";

function BodyParagraphs(props: { body: string[] | null; view: string }) {
  const { body, view } = props;

  if (!body) {
    return null;
  } else {
    return (
      <>
        {body.map((paragraph: string, index: number) => {
          const paragraphArray = paragraph.split(/(?=\*\*)|(?<=\*\*)|{{|}}/g);
          const paragraphContent = paragraphArray.map((content, index) => {
            if (
              paragraphArray[index - 1] === "**" &&
              paragraphArray[index + 1] === "**"
            ) {
              return <strong key={index}>{content}</strong>;
            } else if (content === "**") {
              return null;
            } else if (content === "takeTour") {
              return (
                <StaticcontentButtonButton key={index}>
                  Take Tour
                </StaticcontentButtonButton>
              );
            } else if (content === "completed") {
              return (
                <StaticheaderBackgroundButton key={index}>
                  Mark as completed
                </StaticheaderBackgroundButton>
              );
            } else if (content === "content") {
              return (
                <StatictourButtonButton key={index}>
                  Content
                </StatictourButtonButton>
              );
            } else {
              return content;
            }
          });
          if (view === "home") {
            return (
              <HomeParagraph key={index}>{paragraphContent}</HomeParagraph>
            );
          } else if (view === "introduction") {
            return (
              <AboutParagraph key={index}>{paragraphContent}</AboutParagraph>
            );
          }
        })}
      </>
    );
  }
}

export default BodyParagraphs;
