import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { onMessage, saveLikedFormSubmission } from '../service/mockServer';
import { IFormSubmission } from '../models/form-submission.model';
import AlertMessage from './AlertMessage';
import { IAlertMessage } from '../models/alert-message.model';
import { useSnackbar, SnackbarKey } from 'notistack';

export default function SubmissionToast() {
  const [formSubmissions, setFormSubmissions] = useState<IFormSubmission[]>([]);

  const [alertMessage, setAlertMessage] = useState<IAlertMessage | undefined>(undefined);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    // register callback with submission service
    onMessage(handleFormSubmission);

    return () => {
      // TODO: // remove callback from mockServer.js
    }
    // eslint-disable-next-line
  }, []);

  const handleFormSubmission = async (submission: IFormSubmission) => {    
    setFormSubmissions(
    [
      ...formSubmissions, // that contains all the old items
      submission// and one new item at the end
    ]);

    enqueueSnackbar(<div>{submission?.data?.firstName} {submission?.data?.lastName} <br /> {submission?.data?.email}</div>, {
        key: submission.id,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        action: (key) => action(key, submission)
    });
  };

  const handleLikeClick = (formSubmission: IFormSubmission, snackbarId: SnackbarKey) => {
    // TODO: Add progress loader so that user can not click submit button multiple times
    try {
      saveLikedFormSubmission(formSubmission)
      .then(({ status, message }) => {
        if (status === 202 || status === 200) {
            setAlertMessage({
                messageId: Math.random(),
                severity: 'success',
                message,
            } as IAlertMessage);
        } else {
            setAlertMessage({
                messageId: Math.random(),
                severity: 'error',
                message,
            } as IAlertMessage);
        }
      })
      .catch(({ status, message }) => {
        setAlertMessage({
            messageId: Math.random(),
            severity: 'error',
            message,
        } as IAlertMessage);
      })
      .finally(() => {
        handleClose(snackbarId);
      });
    } catch (err) {
        handleClose(snackbarId);
    }
  };

  const handleClose = (snackbarId: SnackbarKey) => {
    closeSnackbar(snackbarId);
  };

  const action = (key: any, submission: IFormSubmission) => (
    <>
      <Button color="secondary" size="small" onClick={() => handleLikeClick(submission, key)}>
        LIKE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleClose(key)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
        <AlertMessage
            alert={alertMessage}
        />
    </>
  );
}