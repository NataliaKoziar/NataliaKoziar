
import logo from "../../images/logo.png"
import { Button, ButtonToolbar } from 'rsuite';

import s from "./Header.module.scss"
import { Link } from "react-router-dom";
import { AppRoutes } from "../../common/Routes";
export const Header = () => {
    return (
        <div className={s.header}>
            <div className="logo">
                <img width={"100px"} src={logo} alt="logo" />
                <span>LOGO</span>
            </div>
           <Link to={AppRoutes.LOGIN}>
            <ButtonToolbar>
                <Button color="blue" appearance="primary">
                    Log In
                </Button>
            </ButtonToolbar>
           </Link>
        </div>
    )
}
