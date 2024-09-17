import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { continueBuildingJourneyReducer, missingValueMessageReducer } from '../../../reducer/slice';

export default function MissingValuesMessage(missingValuesMessage:any) {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    dispatch(missingValueMessageReducer(false))
    setOpen(false);
  };

  console.log("missingValuesMessage"+JSON.stringify(missingValuesMessage))

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
          {"Missing:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {/* {missingValuesMessage.missingValuesMessage} */}
          {missingValuesMessage.missingValuesMessage}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => { handleClose(false) }}>No Start Afresh</Button> */}
          <Button onClick={() => { handleClose(false) }} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}