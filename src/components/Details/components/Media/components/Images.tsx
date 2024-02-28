import { Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import {
  DetailsImage,
  DetailsCarousel,
  DetailsCarouselImage,
  CarouselDotGroup,
  CarouselButtonFirst,
  CarouselButtonBack,
  CarouselButtonNext,
  CarouselButtonLast,
} from "../../../../styled_components";

import { MediaArrayProps } from "../../../../../types";

function Images({ mediaArray }: MediaArrayProps) {
  return (
    <>
      {mediaArray.length === 1 ? (
        <DetailsImage src={mediaArray[0].path} alt={mediaArray[0].imageAlt} />
      ) : (
        <DetailsCarousel
          visibleSlides={2}
          totalSlides={mediaArray.length}
          naturalSlideWidth={300}
          naturalSlideHeight={400}
          isIntrinsicHeight
        >
          <Slider>
            {mediaArray.map((image, index) => {
              return (
                <Slide tag="a" index={index} key={index}>
                  <DetailsCarouselImage
                    src={image.path}
                    alt={image.imageAlt}
                    hasMasterSpinner={true}
                  />
                </Slide>
              );
            })}
          </Slider>
          {mediaArray.length > 2 ? (
            <>
              <CarouselDotGroup />
              <CarouselButtonFirst>First</CarouselButtonFirst>
              <CarouselButtonBack>Back</CarouselButtonBack>
              <CarouselButtonNext>Next</CarouselButtonNext>
              <CarouselButtonLast>Last</CarouselButtonLast>
            </>
          ) : null}
        </DetailsCarousel>
      )}
    </>
  );
}

export default Images;
