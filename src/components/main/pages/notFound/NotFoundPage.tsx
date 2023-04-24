import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"
import { AppRoutes } from "../../../../common/Routes"
import s from "./style.module.scss"

export const NotFoundPage = () => {
    return (
        <div className={s.content}>
            <h1 style={{color:"red"}}>Page not foud!!!</h1>
            <NavLink to={AppRoutes.MAIN}>
                <Button color="error" >
                        Back to main page
                </Button>

               
            </NavLink>
        </div>
    )
}