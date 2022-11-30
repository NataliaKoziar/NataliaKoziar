import { Link } from "react-router-dom"
import { AppRoutes } from "../../common/Routes"
import s from "./Modal.module.scss"
interface ModalProps {
    children: React.ReactNode
    onClose?:()=>void
}

export const Modal = ({ children, onClose }: ModalProps) => {
    return (<>
 
        <div className={s.overlay} onClick={onClose}></div>
           <div className={s.content}>
            {children}
        </div>
    </>)
}