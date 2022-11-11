import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"

export const LanguagesComponent = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div className={s.userData}>
            <div className={s.title}>Languages</div>
            <div className={s.itemList}>
                <div className={s.item}>
                    <div className="category"></div>
                    <div className="description"></div>
                </div>
                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo />} />)}
            </div>
        </div>
    )
}