import { Route, Routes } from "react-router-dom"
import { AppRoutes } from "../../common/Routes"
import { LoginComponent } from "./pages/login/LoginComponent"
import { NotFoundPage } from "./pages/notFound/NotFoundPage"
import { SignUpComponent } from "./pages/signUp/SignUpComponent"
import { ProfileComponent } from "./pages/profile/ProfileComponent"
import s from "./main.module.scss"
import { Modal } from "../modal/Modal"
import { useNavigate } from "react-router-dom"
import { StartPageComponent } from "./pages/startPage/StartPageComponent"
import { BlogComponent } from "./pages/blog/BlogComponent"
import { CvComponent } from "./pages/cv/CvComponent"

export const MainComponent = () => {

    const navigate = useNavigate()
    const handleClose = () => {
        navigate(AppRoutes.MAIN)
    }

    return (
        <div className={s.container}>
            <Routes>
                <Route path={AppRoutes.MAIN} element={<StartPageComponent />} />
                <Route path={AppRoutes.LOGIN} element={<Modal onClose={handleClose} children={<LoginComponent />} />} />
                <Route path={AppRoutes.SIGN_UP} element={<Modal onClose={handleClose} children={<SignUpComponent />} />} />
                <Route path={AppRoutes.PROFILE} element={<ProfileComponent />} />
                <Route path={AppRoutes.BLOG} element={<BlogComponent />} />
                <Route path={'/:id'} element={<CvComponent />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}