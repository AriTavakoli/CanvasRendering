import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';

export default function UndoRedo({ handleUndo, handleRedo }) {
  return (
    <ToggleButtonGroup className='undo-redo'>

      <ToggleButton onClick={() => { handleUndo(); }}>
        <UndoOutlinedIcon ></UndoOutlinedIcon>
      </ToggleButton>


      <ToggleButton onClick={() => { handleRedo() }}>
        <RedoOutlinedIcon> </RedoOutlinedIcon>
      </ToggleButton>

    </ToggleButtonGroup>


  )
}
