import * as React from 'react';
import CircularProgress, {
  circularProgressClasses
} from '@mui/material/CircularProgress';
import { Container, Box, Typography, Grid, Portal } from '@mui/material';

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={60}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={60}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

const CircularSpinnerProgress = () => {
  return (
    <Container maxWidth={false}>
      <Grid
        container
        display="flex"
        spacing={3}
        alignContent="center"
        alignItems="center"
        direction="column"
        height="100%"
        marginTop="25%"
      >
        <Grid>
          <FacebookCircularProgress />
        </Grid>
        <Grid>
          <Typography color="textPrimary" variant="h2">
            Loading...
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CircularSpinnerProgress;
