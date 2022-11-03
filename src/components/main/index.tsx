import { Route, Routes } from "react-router-dom"
import { AppRoutes } from "../../common/Routes"
import { LoginComponent } from "./pages/login/LoginComponent"
import { NotFoundPage } from "./pages/notFound/NotFoundPage"
import { SignUpComponent } from "./pages/signUp/SignUpComponent"
import s from "./main.module.scss"
// import { Modal } from "./modal/Modal"

export const MainComponent =()=>{
   return(
    <div className={s.container}>
     <Routes>
        <Route path={AppRoutes.MAIN} element = {<h1>Main page</h1>}/>
        <Route path={AppRoutes.LOGIN} element = {<LoginComponent/>}/>
        <Route path={AppRoutes.SIGN_UP} element = {<SignUpComponent/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    </div>
    )
}