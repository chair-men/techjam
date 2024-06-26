import React from 'react';
import { useCurrentFrame, Sequence } from 'remotion';
import { SoundVisualization } from '../templates/visualizations/SoundVisualization';
import { TypeText } from '../templates/TypeText/TypeText';
import { TextTransition } from '../templates/TextTransition/TextTransition';
import { TextImage } from '../templates/TextImage/TextImage';
import RenderProperties from '../interfaces/RenderProperties';

export const Output: React.FC<RenderProperties[]> = (renderProperties) => {
  const frame = useCurrentFrame();
  var arr = Object.keys(renderProperties).map(function (k) {
    return renderProperties[k];
  });
  console.log(arr, 'FUCK');
  return (
    <div>
      {arr
        ? arr.map((item: RenderProperties, idx: number) => {
            let output = <TypeText renderProps={item} />;
            if (item.type == 'textImage') {
              output = <TextImage renderProps={item} />;
            } else if (item.type == 'textTransition') {
              output = <TextTransition renderProps={item} />;
            } else if (item.type == 'soundVisualization') {
              output = <SoundVisualization renderProps={item} />;
            } else {
              output = <TypeText renderProps={item} />;
            }
            return (
              <Sequence from={idx * 150} durationInFrames={150}>
                {output}
              </Sequence>
            );
          })
        : null}
    </div>
  );
};
