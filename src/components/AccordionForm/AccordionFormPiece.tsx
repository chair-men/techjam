import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import RenderProperties from '../../interfaces/RenderProperties';

interface Props {
  onChange: (values: RenderProperties) => void;
  initialValues?: RenderProperties;
}

const AccordionFormPiece: React.FC<Props> = ({ onChange, initialValues }) => {
  const [values, setValues] = useState<RenderProperties>(initialValues || { type: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select name="type" value={values.type} onChange={handleChange} label="Type">
          <MenuItem value="textImage">Text Image</MenuItem>
          <MenuItem value="textTransition">Text Transition</MenuItem>
          <MenuItem value="typeText">Type Text</MenuItem>
          <MenuItem value="soundVisualization">Sound Visualization</MenuItem>
        </Select>
      </FormControl>
      {[
        'text',
        'text1',
        'textColor',
        'textColor1',
        'img',
        'img1',
        'textPosition',
        'soundStyle',
        'soundColor1',
        'soundColor2',
        'soundPosition',
        'backgroundVideo',
        'backgroundColor',
        'backgroundMusic',
      ].map((field) => (
        <TextField
          key={field}
          label={field}
          name={field}
          value={values[field as keyof RenderProperties] || ''}
          onChange={handleChange}
          fullWidth
        />
      ))}
    </Box>
  );
};

export default AccordionFormPiece;
