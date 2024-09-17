import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toastJourneyPublishedReducer } from '../../../reducer/slice';
import { useDispatch } from 'react-redux';

export default function PublishJourneySnackBar(displaySnack: any) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const toastJourneyPublishedDispatch = useDispatch()
  React.useEffect(() => {

    setOpen(true);
    setTimeout(() => {
      toastJourneyPublishedDispatch(toastJourneyPublishedReducer(false))

    }, 2000)

  }, [displaySnack])

  const handleClose = (event: React.SyntheticEvent<any, Event> | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Journey Published"
        // action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  );
}
