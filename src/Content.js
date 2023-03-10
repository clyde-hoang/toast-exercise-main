import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LikedSubmissionList from './components/LikedSubmissionList';

export default function Content() {
  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <LikedSubmissionList />
    </Box>
  );
}
