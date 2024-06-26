/*
Types can be:
*/

export default interface RenderProperties {
  type: string; // textImage, textTransition, typeText, soundVisualization
  text?: string;
  text1?: string;
  //   text2?: string;
  //   text3?: string;
  //   text4?: string;
  textColor?: string;
  textColor1?: string;
  //   textColor2?: string;
  //   textColor3?: string;
  //   textColor4?: string;
  img?: string;
  img1?: string;
  //   img2?: string;
  //   img3?: string;
  //   img4?: string;
  textPosition?: string; // top, center, bottom
  soundStyle?: string; // bars, radial, hills1, hills2, wave1, wave2
  soundColor1?: string;
  soundColor2?: string;
  soundPosition?: string; // top, bottom
  backgroundVideo?: string;
  backgroundColor?: string;
  backgroundMusic?: string;
}
