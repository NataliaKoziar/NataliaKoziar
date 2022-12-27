import { Tooltip } from "@mui/material"
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';


interface RemoveProps {
    removeElement:()=>void
}

export const RemoveComponent = ({removeElement}: RemoveProps) => {

        return (
        <Tooltip title="delete" >
            <CancelPresentationOutlinedIcon color="primary" sx={{ position: "absolute", top: 5, right: 10, zIndex: 1, cursor: "pointer" }} onClick={removeElement} />
        </Tooltip>)
}