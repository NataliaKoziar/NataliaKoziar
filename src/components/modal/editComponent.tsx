import { Tooltip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

interface Edit {
    onOpen: () => void
}

export const EditComponent = ({ onOpen }: Edit) => {
    return (
        <Tooltip title="edit" >
            <EditIcon color="primary" sx={{ position: "absolute", bottom: 5, right: 10, zIndex: 1, cursor: "pointer" }} onClick={onOpen} />
        </Tooltip>)
}