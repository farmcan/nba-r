import "./index.css";
import { Composition } from "remotion";
import { CelticsSixersPreview } from "./CelticsSixersPreview";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Celtics76ersPreviewExample"
        component={CelticsSixersPreview}
        durationInFrames={1600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NBAPlayoffPulse"
        component={MyComposition}
        durationInFrames={630}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
