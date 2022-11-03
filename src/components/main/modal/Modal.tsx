
import s from "./Modal.module.scss"
interface ModalProps{
    children:React.ReactNode
}

export const Modal =({children}:ModalProps)=>{
    <>
    <div className={s.overlay}></div>
    <div className={s.content}>
        {children}
    </div>
    </>
}