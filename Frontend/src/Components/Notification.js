import React from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const Notification = (props) => {
  const { notify, setNotify } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false
    });
  };

  return (
    <div>
      <Snackbar
        open={props.notify.isOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert severity={props.notify.type || undefined} onClose={handleClose}>
          {props.notify.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
