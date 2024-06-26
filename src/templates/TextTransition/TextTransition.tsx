import { Audio, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { TextTransitionTitle } from './TextTransitionTitle';
import { Transition } from './Transition';
import { FadeTransition } from './FadeTrasition';
import logo from './logo.png';
import RenderProperties from '../../interfaces/RenderProperties';
import speechSrc from '../../constants/gourmetrace.mp3';

export const TextTransition: React.FC<{ renderProps: RenderProperties }> = ({ renderProps }) => {
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
  const transitionStart = 80;

  return (
    <div style={{ flex: 1, backgroundColor: renderProps.backgroundColor }}>
      <Audio src={speechSrc} />
      <div style={{ opacity }}>
        <Sequence from={0} durationInFrames={80}>
          <FadeTransition type="in" duration={45}>
            <FadeTransition type="out" duration={6}>
              <img
                src={logo}
                width="700px"
                style={{ position: 'absolute', top: '17%', left: '33%' }}
              />
            </FadeTransition>
          </FadeTransition>
        </Sequence>
        <Sequence from={transitionStart} durationInFrames={40}>
          <FadeTransition type="out" duration={8}>
            <TextTransitionTitle titleText={renderProps.text} titleColor={renderProps.textColor} />
          </FadeTransition>
        </Sequence>
        {renderProps.text1 ? (
          <Sequence from={transitionStart + 40} durationInFrames={60}>
            <Transition type="in">
              <FadeTransition type="out" duration={6}>
                <TextTransitionTitle
                  titleText={renderProps.text1}
                  titleColor={renderProps.textColor}
                />
              </FadeTransition>
            </Transition>
          </Sequence>
        ) : null}
      </div>
    </div>
  );
};
