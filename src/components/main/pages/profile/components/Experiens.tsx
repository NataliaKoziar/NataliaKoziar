import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"


export const ExperienceComponent = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div className={s.userData}>
            <div className={s.title}>Experience</div>
            <div className={s.itemList}>
                <div className={s.item}>
                    <div className="category">Company:</div>
                    <div className="description">Lviv City Counsil</div>
                </div>
                <div className={s.item}>
                    <div className="category">Position:</div>
                    <div className="description">spetialist of waste management</div>
                </div>
                <div className={s.item}>
                    <div className="category">Period:</div>
                    <div className="description">2017-2022</div>
                </div>
                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo />} />)}
            </div>
        </div>
    )
}