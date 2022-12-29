import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Avatar, Button} from "@mui/material"
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../common/Routes';
import { User } from 'firebase/auth';
interface MenuProps {
    handleSignOut: () => void
    account: User | null | undefined
}

export const BurgerMenu = ({ account, handleSignOut }: MenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
    
            <Button onClick={handleClick}>
                <MenuIcon color='info' />
            </Button>
           
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                { account !== null && <MenuItem onClick={() => {navigate(AppRoutes.PROFILE); handleClose()}}>
                    <Avatar
                        src={account?.photoURL || "/broken-image.jpg"}
                        sx={{ width: 25, height: 25, marginRight: '10px' }}
                    /> Profile
                </MenuItem>}
                <MenuItem onClick={() => {navigate(AppRoutes.MAIN); handleClose()}}>
                <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                     Main
                </MenuItem>
                <MenuItem onClick={() => {navigate(AppRoutes.BLOG); handleClose()}}>
                <ListItemIcon>
                    <SendIcon fontSize="small" />
                </ListItemIcon>
                     Blog
                </MenuItem>
                {account? <MenuItem onClick={()=>{handleSignOut(); handleClose()}}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>:
                <MenuItem onClick={()=>{navigate(AppRoutes.LOGIN); handleClose()}}>
                <ListItemIcon>
                    <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
            </MenuItem>}
            </Menu>
        </div>
    )
}