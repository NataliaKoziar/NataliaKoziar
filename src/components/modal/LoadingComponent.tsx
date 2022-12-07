import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export const LoadingConponent=()=>{
    return(
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
             <CircularProgress size="4rem" variant="indeterminate"/>
        </Box> 
    )
}