import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import '@layouts/Buttons/undo-redo.css';

export default function UndoRedo({ handleUndoClick, handleRedoClick }) {
  return (
    <ToggleButtonGroup className='undo-redo'>

      <ToggleButton onClick={() => { handleUndoClick(); }}>
        <UndoOutlinedIcon ></UndoOutlinedIcon>
      </ToggleButton>


      <ToggleButton onClick={() => { handleRedoClick() }}>
        <RedoOutlinedIcon> </RedoOutlinedIcon>
      </ToggleButton>

    </ToggleButtonGroup>


  )
}
