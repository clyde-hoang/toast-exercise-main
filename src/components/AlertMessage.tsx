import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { IAlertMessage } from '../models/alert-message.model';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface IOwnProps {
    alert?: IAlertMessage;
}

// TODO: Convert component to context or this component can read from context so that other components can post alert messages without the need to embed component
export default function AlertMessage({ alert }: IOwnProps) {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  
  React.useEffect(() => {
    if (alert?.message) {
      setOpen(true);
      setAlertMessage(alert.message);
    } else {
      setOpen(false);
      setAlertMessage('');
    }
  }, [alert?.messageId, alert?.message]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setAlertMessage('');
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
        open={open} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert?.severity ?? 'success'} sx={{ width: '100%' }}>
            {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}