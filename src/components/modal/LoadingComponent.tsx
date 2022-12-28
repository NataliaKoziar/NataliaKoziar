import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export const LoadingConponent=()=>{
    return(
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
             <CircularProgress size="4rem" variant="indeterminate"/>
        </Box> 
    )
}