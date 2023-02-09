import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import { IFormSubmission } from '../models/form-submission.model';
import LikedSubmissionListItem from './LikedSubmissionListItem';
import { fetchLikedFormSubmissions } from '../service/mockServer';
import { LIKED_SUBMISSIONS_REFRESH_INTERVAL } from '../constants';
//import { IAlertMessage} from '../models/alert-message.model';
//import AlertMessage from '../components/AlertMessage';

export default function LikedSubmissionList() {
  // TODO: store liked submissions in redux store instead of component state 
  const [ likedFormSubmission, setLikedFormSubmission] = useState<IFormSubmission[]>([]);
  // const [alertMessage, setAlertMessage] = useState<IAlertMessage | undefined>(undefined);

  useEffect(() => {
    let interval = setInterval(() => {
      retrieveLikedFormSubmissions();
    }, LIKED_SUBMISSIONS_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // TODO: Improvement, instead of using a pull mechanism to retrieve data instead implement a push mechanism to refresh liked submissions list
  // ie. SSE, websocket or a data feed (such as Kafka, RabbitMQ)
  const retrieveLikedFormSubmissions = () => {
    try {
      fetchLikedFormSubmissions()
        .then((resp) => {
          setLikedFormSubmission(resp.formSubmissions)
        })
        .catch(({ status, message }) => {
            // TODO: Unsure how to handle error retrieving list, will log to console
            console.error(message);
            /*setAlertMessage({
                messageId: Math.random(),
                severity: 'error',
                message: `retrieveLikedFormSubmissions: ${message}`
            } as IAlertMessage)*/
        })
        .finally(()=> { /* clean up */ });
    } catch (error) {
      // TODO: Error Handling
    }
  };

  return (
    <>
         { /*<AlertMessage alert={alertMessage} />*/ }
        <Stack direction="column" spacing={2} sx={{ marginTop: 2, maxWidth: 600 }}>
        {likedFormSubmission?.map(s => (
            <LikedSubmissionListItem key={s.id} item={s} />
        ))}
        </Stack>
    </>
  );
}
