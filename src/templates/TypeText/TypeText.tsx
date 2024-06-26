import { Sequence, useCurrentFrame, useVideoConfig, Audio, OffthreadVideo } from 'remotion';
import RenderProperties from '../../interfaces/RenderProperties';
import speechSrc from '../../constants/gourmetrace.mp3';

export const TypeText: React.FC<{ renderProps: RenderProperties }> = ({ renderProps }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const str = renderProps.text
    ? renderProps.text.substr(0, Math.round(frame / 3))
    : renderProps.text;
  return (
    <Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
      <Audio src={speechSrc} />
      {renderProps.backgroundVideo ? <OffthreadVideo src={renderProps.backgroundVideo} /> : null}

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent:
            renderProps.textPosition in ['start', 'end', 'center']
              ? renderProps.textPosition
              : 'center',
          textAlign: 'center',
          zIndex: 1,
        }}>
        <p style={{ fontSize: 60 }}>{str}</p>
      </div>
    </Sequence>
  );
};
