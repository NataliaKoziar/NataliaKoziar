
import logo from "../../images/logo.png"
import s from "./Header.module.scss"
import { Link, NavLink } from "react-router-dom";
import { AppRoutes } from "../../common/Routes";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Tooltip } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import { BurgerMenu } from "../modal/BurgerMenu";
export const Header: React.FC = () => {
    const [account] = useAuthState(auth)
    console.log(account)
    const handleSignOut = async () => {
        await signOut(auth)
    }
    return (

        <header className={s.header}>
           
            <div className={s.logo}>
                <img width={"100px"} src={logo} alt="logo" />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Lets go...
                </Typography>
            </div>
            <div className={s.header_menu}>
                <NavLink to={AppRoutes.MAIN} className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
                    Main
                </NavLink>
                <NavLink to={AppRoutes.BLOG} className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
                    Posts
                </NavLink>
            </div>
            <div className={s.auth}>
                {account &&
                    <Link to={AppRoutes.PROFILE} style={{ color: "white", textDecoration: "none" }}>
                        <Tooltip title="My profile" >
                            <Avatar
                                src={account?.photoURL || "/broken-image.jpg"}
                                sx={{ width: 40, height: 40, margin: "0px 10px" }}
                            />
                        </Tooltip>
                    </Link>}
                {!account ? (<Link to={AppRoutes.LOGIN} style={{ color: "white", textDecoration: "none" }}>
                    <Button variant="contained" size="large">Login</Button>
                </Link>) : (<Link to={AppRoutes.MAIN} style={{ color: "white", textDecoration: "none" }}>
                    <button className={s.btn} onClick={handleSignOut} >
                        <Tooltip title="SignOut" >
                            <LogoutIcon />
                        </Tooltip>
                    </button>
                </Link>)}
            </div>
            <div className={s.burger_menu}>
                <BurgerMenu account={account} handleSignOut={handleSignOut} />
            </div>
                     
        </header>

    )
}
