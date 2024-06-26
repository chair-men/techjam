import { Player } from '@remotion/player';
import { useState } from 'react';
import { SoundVisualization } from '../../templates/visualizations/SoundVisualization';
import { CustomizedAccordions } from '../../components/AccordionForm/AccordionForm';
import { TypeText } from '../../templates/TypeText/TypeText';
import { TextTransition } from '../../templates/TextTransition/TextTransition';
import { TextImage } from '../../templates/TextImage/TextImage';
import './styles.css';
import MainLayout from '../layout/MainLayout';
import FileUpload from '../../components/FileUpload/FileUpload';
import { compositionWidth, compositionHeight, fps } from '../../constants/playerConstants';
import { useFormState } from '../../hooks/useFormState';
import { Output } from '../../remotion/Output';

export default function Main() {
  const [foo, setFoo] = useState('bar');
  const [status, setStatus] = useState('not-rendering');
  const [url, setUrl] = useState('');
  const [formState, addItem, updateItem, removeItem] = useFormState([]);
  console.log(formState);
  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: '0 auto' }}>
          <Player
            className="__player"
            style={{
              height: 320,
              margin: '0 auto',
            }}
            component={Output}
            durationInFrames={500}
            compositionWidth={compositionWidth}
            compositionHeight={compositionHeight}
            fps={fps}
            loop
            autoPlay
            controls
            inputProps={formState}
          />
        </div>
        {/* <FileUpload /> */}

        {url && (
          <div>
            <p>Rendered video</p>
            <video style={{ width: 320, margin: '0 auto' }} controls autoPlay loop src={url} />
          </div>
        )}
        <div style={{ margin: 20 }} />
        <CustomizedAccordions
          formState={formState}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />
        <div>
          <button
            role="button"
            disabled={status === 'rendering'}
            onClick={async () => {
              setUrl('');
              setStatus('rendering');
              try {
                const { location } = await fetch(`//localhost:3001/render?foo=${foo}`).then((r) =>
                  r.json()
                );
                setUrl(location);
              } catch (e) {}
              setStatus('not-rendering');
            }}>
            Render
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
