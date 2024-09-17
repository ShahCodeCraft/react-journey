import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { continueBuildingJourneyReducer } from '../../../reducer/slice';

export default function ContinueBuildingJourney() {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {


    if (value) {
      dispatch(continueBuildingJourneyReducer(value))
      // continueBuildingJourneySlice
    } else {
      dispatch(continueBuildingJourneyReducer(value))
    }
    setOpen(false);


  };

  return (
    <React.Fragment>

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ '& .MuiDialog-paper': { width: '450px' } }}  // Set the width here

      >
        <DialogTitle id="alert-dialog-title">
          {"Continue building journey"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Would you like to continue building your journey from where you last left?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose(false) }}>No Start Afresh</Button>
          <Button onClick={() => { handleClose(true) }} autoFocus>
            Yes, Please
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}