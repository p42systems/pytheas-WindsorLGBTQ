import { VideoPlayer } from "../../../../styled_components";

interface MediaArrayProps {
  mediaArray: { path: string; type: string; imageAlt: string }[];
}

function Video({ mediaArray }: MediaArrayProps) {
  return (
    <>
      {mediaArray.map((video) => (
        <VideoPlayer
          controls={true}
          height={"400px"}
          width={"100%"}
          url={video.path}
        />
      ))}
    </>
  );
}

export default Video;
