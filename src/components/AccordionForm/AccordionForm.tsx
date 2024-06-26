import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UpdateItem, RemoveItem, AddItem, useFormState } from '../../hooks/useFormState';
import RenderProperties from '../../interfaces/RenderProperties';
import AccordionFormPiece from './AccordionFormPiece';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const CustomizedAccordions: React.FC<{
  formState: RenderProperties[];
  addItem: AddItem<object>;
  removeItem: RemoveItem;
  updateItem: UpdateItem<object>;
}> = ({ formState, addItem, removeItem, updateItem }) => {
  const [expanded, setExpanded] = React.useState<number | boolean>(0);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeForm = (panel: number) => (newValues: RenderProperties) => {
    updateItem(panel, newValues);
  };

  const addAccordion = () => {
    const newAccordion = { type: 'textImage' };
    addItem(newAccordion);
  };

  console.log(formState);

  return (
    <div>
      {formState.map((formItem, idx) => (
        <Accordion key={idx} expanded={expanded === idx} onChange={handleChange(idx)}>
          <AccordionSummary aria-controls={`${idx}-content`} id={`${idx}-header`}>
            <Typography>Item {idx + 1}</Typography>
          </AccordionSummary>
          <AccordionFormPiece onChange={handleChangeForm(idx)} />
        </Accordion>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={addAccordion}
        style={{ marginTop: '10px' }}>
        Add Item
      </Button>
    </div>
  );
};
