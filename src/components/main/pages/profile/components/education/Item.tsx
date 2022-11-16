import { IEducation } from "../../../../../../redux/models"
import { EditComponent } from "../../../../../modal/editComponent"
import { useState } from "react"
import { Modal } from "../../../../../modal/Modal"
import { FormEducation } from "../../../../../modal/forms/FormEducation"
import s from "../../profile.module.scss"

interface ItemProps {
    data: IEducation
}

export const Item = ({ data }: ItemProps) => {
    const [activeItem, setActiveItem] = useState<IEducation>(data)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div >
            <hr />
            <div className={s.name}>{data?.univercity}</div>
            <div className={s.subtitle}> {data?.direction}</div>
            <div className={s.time} >{data?.period?.start} - {data?.period?.end}</div>
            <EditComponent onOpen={handleOpenModal}/>
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormEducation item={activeItem} onClose={handleCloseModal} />} />)}
        </div>)

}