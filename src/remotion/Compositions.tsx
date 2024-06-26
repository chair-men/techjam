import React from 'react';
import { Composition } from 'remotion';
import { Output } from './Output';

export const Compositions: React.FC = () => {
  return (
    <>
      <Composition
        id="Output"
        component={Output}
        durationInFrames={Infinity}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
