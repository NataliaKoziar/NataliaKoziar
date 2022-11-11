import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"

export const HobbiesComponent = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)



    return (
        <div className={s.userData}>
            <div className={s.title}>Hobbies</div>
            <div className={s.itemList}>
                <div className={s.item}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia saepe doloremque enim libero vel dicta possimus a accusamus ea autem?
                </div>
                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo />} />)}
            </div>
        </div>
    )
}