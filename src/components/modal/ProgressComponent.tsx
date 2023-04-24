import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export  function ProgressComponent(props: CircularProgressProps & { value: number }) {

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size="5rem" variant="determinate" {...props}  />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex:2
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="white"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}