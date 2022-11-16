import { Fab, Tooltip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

interface Add{
    onOpen:()=>void
}

export const AddComponent = ({onOpen}:Add) => {
    return (
        <Tooltip title="add" >
            <Fab  size="medium" aria-label="add" sx={{position:"absolute", top:5, right:10, zIndex:1}} onClick={onOpen}>
                <AddIcon />
            </Fab>
        </Tooltip>)
}