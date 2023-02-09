import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';
import SubmissionToast from './components/SubmissionToast';
import './my-styles.css'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      <SubmissionToast />
    </>
  );
}

export default App;
