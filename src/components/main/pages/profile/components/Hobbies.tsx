import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../modal/editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"

export const HobbiesComponent = () => {
    const data = useTypedSelector(state=>state.user.user?.hobbies)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)



    return (
        <div className={s.userData}>
            <div className={s.title}>Hobbies</div>
            <div className={s.itemList}>
                <hr/>
                <div className={s.item}>
                   {(data?.trim().length !== undefined && data?.trim().length >0)?
                   data: "Data has been empty yet"}
                </div>
                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo onClose={handleCloseModal} />} />)}
            </div>
        </div>
    )
}