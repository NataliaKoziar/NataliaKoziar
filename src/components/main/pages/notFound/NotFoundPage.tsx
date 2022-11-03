import { NavLink } from "react-router-dom"
import { AppRoutes } from "../../../../common/Routes"
import { Button, ButtonToolbar } from 'rsuite';

export const NotFoundPage = () => {
    return (
        <>
            <h1 style={{color:"red"}}>Page not foud!!!</h1>
            <NavLink to={AppRoutes.MAIN}>
                <ButtonToolbar>

                    <Button color="red" appearance="primary">
                        Back to main page
                    </Button>

                </ButtonToolbar>
            </NavLink>
        </>
    )
}