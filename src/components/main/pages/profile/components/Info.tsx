import {useState} from "react"
import {EditComponent} from "../../../../editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"
import s from "../profile.module.scss"
export const InfoComponent=()=>{
    const user = useTypedSelector(state=>state.user.user)

const [isModalOpen, setModalOpen] = useState<boolean>(false)
const handleCloseModal = ()=>setModalOpen(false)
const handleOpenModal = ()=>setModalOpen(true)


    return(
        <div className={s.userData}>
        <div className={s.title}>Personal information</div>
        <div className={s.itemList}>
            <div className={s.item}>
                <div className={s.category}>Full name: </div>
                <div className="description">{user.firstName} {user.lastName}</div>
            </div>
                <div className={s.item}>
                <div className={s.category}>Date of Birth: </div>
                <div className="description">{user.dateOfBirth}</div>
            </div>
            <div className={s.item}>
                <div className={s.category}>Position: </div>
                <div className="description">{user.position}</div>
                           </div>
            <EditComponent onOpen={handleOpenModal}/>
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo/>} />)}
        </div>
    </div>
    )
}