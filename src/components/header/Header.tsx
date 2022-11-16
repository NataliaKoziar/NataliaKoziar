
import logo from "../../images/logo.png"
// import { Button, ButtonToolbar } from 'rsuite';
import s from "./Header.module.scss"
import { Link } from "react-router-dom";
import { AppRoutes } from "../../common/Routes";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
export const Header: React.FC = () => {
    const [user] = useAuthState(auth)
    console.log(user)
    const handleSignOut = async () => {
        await signOut(auth)
    }
    return (
        // <div className={s.header}>
        //     <div className="logo">
        //         <img width={"100px"} src={logo} alt="logo" />
        //         <span>LOGO</span>
        //     </div>
        //    <Link to={AppRoutes.LOGIN}>
        //     <ButtonToolbar>
        //         <Button color="blue" appearance="primary">
        //             Log In
        //         </Button>
        //     </ButtonToolbar>
        //    </Link>
        // </div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <div className="logo">
                        <img width={"100px"} src={logo} alt="logo" />
                    </div>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        LOGO
                    </Typography>
                    {!user ? (<Link to={AppRoutes.LOGIN} style={{ color: "white", textDecoration: "none" }}>
                        <Button variant="contained" size="large">Login</Button>
                    </Link>) : (<Link to={AppRoutes.MAIN} style={{ color: "white", textDecoration: "none" }}>
                        <Button variant="contained" size="large" onClick={handleSignOut}>Sign Out</Button>
                    </Link>)}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
