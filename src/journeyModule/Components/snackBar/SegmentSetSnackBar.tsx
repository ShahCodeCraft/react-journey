
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toastJourneyPublishedReducer } from '../../../reducer/slice';
import { useDispatch } from 'react-redux';

const SegmentSetSnackBar = () => {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const toastJourneyPublishedDispatch = useDispatch()
    React.useEffect(() => {
  
      setOpen(true);
    },[])
  
    const handleClose = (event: React.SyntheticEvent<any, Event> | Event, reason: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  

    
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Segment Selected"
        // action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  )
}

export default SegmentSetSnackBar




