import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import Content from './Content';
import SubmissionToast from './components/SubmissionToast';
import { SnackbarProvider } from 'notistack';
import './my-styles.css'
import {
  SUBMISSION_TOASTER_VERTICAL_ALIGN,
  SUBMISSION_TOASTER_HORIZONTAL_ALIGN
} from './constants';

function App() {
  return (
    <>
      <SnackbarProvider anchorOrigin={{ 
        vertical: SUBMISSION_TOASTER_VERTICAL_ALIGN, 
        horizontal: SUBMISSION_TOASTER_HORIZONTAL_ALIGN 
      }}>
        <Header />
        <Container>
          <Content />
        </Container>
        <SubmissionToast />
      </SnackbarProvider>
    </>
  );
}

export default App;
