import { Fab, Tooltip } from "@mui/material"
import  EditIcon  from "@mui/icons-material/Edit"

interface Edit{
    onOpen:()=>void
}

export const EditComponent = ({onOpen}:Edit) => {
    return (
        <Tooltip title="edit" >
            <Fab color="primary" aria-label="edit" sx={{position:"absolute", bottom:5, right:10, zIndex:1}} onClick={onOpen}>
                <EditIcon />
            </Fab>
        </Tooltip>)
}