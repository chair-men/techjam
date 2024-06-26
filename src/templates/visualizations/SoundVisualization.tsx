import { AudioData, useAudioData, visualizeAudio } from '@remotion/media-utils';
import { Audio, Sequence, useCurrentFrame, useVideoConfig, OffthreadVideo } from 'remotion';
import speechSrc from '../../constants/gourmetrace.mp3';
import { BarsVisualization } from './BarsVisualization';
import { HillsVisualization } from './HillsVisualization';
import { RadialBarsVisualization } from './RadialBarsVisualization';
import { WaveVisualization } from './WaveVisualization';
import RenderProperties from '../../interfaces/RenderProperties';
import { compositionWidth } from '../../constants/playerConstants';
/**
 * Component API:s
 *
 * There are quite a few props that will allow for
 * customizing the components and easily creating new
 * variations for the end user.
 *
 * You could even expose some props to the end user
 * in a settings panel so they can tweak and create
 * their own variation.
 */

/**
 * Audio Sensitivity
 *
 * Each component takes optional `maxDb` and `minDb` props
 * that affect the "sensitivity" of the visualization.
 * They are set at sensible defaults, but I recommend
 * exposing these properties to the user to they can
 * adjust how much the visualizations react to the audio.
 *
 * Note: decibels are negative values (or zero)!
 * Sensible values for `minDb` and `maxDb` are in the range
 * of -120 to 0.
 */

const combineValues = (length: number, sources: Array<number[]>): number[] => {
  return Array.from({ length }).map((_, i) => {
    return sources.reduce((acc, source) => {
      // pick the loudest value for each frequency bin
      return Math.max(acc, source[i]);
    }, 0);
  });
};

const visualizeMultipleAudio = ({
  sources,
  ...options
}: {
  frame: number;
  fps: number;
  numberOfSamples: number;
  sources: Array<AudioData>;
  smoothing?: boolean | undefined;
}) => {
  const sourceValues = sources.map((source) => {
    return visualizeAudio({ ...options, audioData: source });
  });
  return combineValues(options.numberOfSamples, sourceValues);
};

export const SoundVisualization: React.FC<{ renderProps: RenderProperties }> = ({
  renderProps,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const speechData = useAudioData(speechSrc);
  if (!speechData) return null;

  // I suggest using either 1024, or 512.
  // Larger number = finer details
  // Smaller number = faster computation
  const nSamples = 512;

  const visualizationValues = visualizeMultipleAudio({
    fps,
    frame,
    sources: [speechData],
    numberOfSamples: nSamples,
  });

  // optional: use only part of the values
  const frequencyData = visualizationValues.slice(0, 0.7 * nSamples);

  const containerStyles =
    renderProps.soundPosition == 'top'
      ? {
          top: 20,
          left: 0,
        }
      : { bottom: 20, left: 0 };

  let visualizationComponent = (
    <BarsVisualization
      frequencyData={frequencyData}
      width={compositionWidth}
      height={120}
      lineThickness={5}
      gapSize={7}
      roundness={2}
      color={renderProps.soundColor1 ? renderProps.soundColor1 : '#F3B3DC'}
    />
  );
  switch (renderProps.soundStyle) {
    case 'bars':
      visualizationComponent = (
        <BarsVisualization
          frequencyData={frequencyData}
          width={compositionWidth}
          height={120}
          lineThickness={5}
          gapSize={7}
          roundness={2}
          color={renderProps.soundColor1 ? renderProps.soundColor1 : '#F3B3DC'}
        />
      );
      break;
    case 'radial':
      visualizationComponent = (
        <RadialBarsVisualization
          frequencyData={frequencyData}
          diameter={400}
          innerRadius={100}
          color={renderProps.soundColor1 ? renderProps.soundColor1 : '#DCBC8A'}
        />
      );
      break;
    case 'hills1':
      visualizationComponent = (
        <HillsVisualization
          frequencyData={frequencyData}
          width={compositionWidth}
          height={72 * 2}
          fillColor={[
            renderProps.soundColor1 ? renderProps.soundColor1 : '#559B59',
            renderProps.soundColor2 ? renderProps.soundColor2 : '#466CF6',
            '#E54B41',
          ]}
          copies={3}
          blendMode="screen"
        />
      );
      break;
    case 'hills2':
      visualizationComponent = (
        <HillsVisualization
          frequencyData={frequencyData}
          width={compositionWidth}
          height={60 * 2}
          strokeWidth={2}
          strokeColor={
            renderProps.soundColor1 ? renderProps.soundColor1 : 'rgb(100, 120, 250, 0.2)'
          }
          fillColor={renderProps.soundColor2 ? renderProps.soundColor2 : 'rgb(70, 90, 200, 0.2)'}
          copies={5}
        />
      );
      break;
    case 'wave1':
      visualizationComponent = (
        <WaveVisualization
          frequencyData={frequencyData}
          width={compositionWidth}
          height={125 * 2}
          offsetPixelSpeed={200}
          lineColor={[
            renderProps.soundColor1 ? renderProps.soundColor1 : '#559B59',
            renderProps.soundColor2 ? renderProps.soundColor2 : '#466CF6',
          ]}
          lineGap={(2 * 280) / 8}
          topRoundness={0.2}
          bottomRoundness={0.4}
          sections={8}
        />
      );
      break;
    case 'wave2':
      visualizationComponent = (
        <WaveVisualization
          frequencyData={frequencyData}
          width={compositionWidth}
          height={125 * 2}
          lineColor={renderProps.soundColor1 ? renderProps.soundColor1 : '#EE8482'}
          lines={6}
          lineGap={6}
          sections={10}
          offsetPixelSpeed={-100}
        />
      );
      break;
  }
  return (
    <Sequence from={0}>
      <Audio src={speechSrc} />
      {renderProps.backgroundVideo ? <OffthreadVideo src={renderProps.backgroundVideo} /> : null}
      <div>
        <div style={{ position: 'absolute', ...containerStyles }}>{visualizationComponent}</div>
      </div>
    </Sequence>
  );
};
