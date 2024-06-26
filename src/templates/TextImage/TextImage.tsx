import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
  Audio,
} from 'remotion';
import RenderProperties from '../../interfaces/RenderProperties';
import { Title } from './Title';

export const TextImage: React.FC<{ renderProps: RenderProperties }> = ({ renderProps }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const opacity = interpolate(
    frame,
    [videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const opacity2 = interpolate(frame, [0, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const transitionStart = 25;

  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      <div style={{ opacity }}>
        <Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
          <img src={renderProps.img} />
        </Sequence>
        <Sequence from={transitionStart + 10} durationInFrames={Infinity}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              opacity: opacity2,
            }}>
            <Title titleText={renderProps.text} titleColor={renderProps.textColor} />
            <div
              style={{
                fontFamily: 'Helvetica, Arial',
                fontSize: 40,
                textAlign: 'center',
                position: 'absolute',
                bottom: 140,
                width: '100%',
                color: renderProps.textColor1,
                opacity: opacity2,
              }}>
              {renderProps.text1}
            </div>
          </div>
        </Sequence>
      </div>
    </div>
  );
};
