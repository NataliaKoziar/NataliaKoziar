import { IEducation } from "../../../../../../redux/models"
import { EditComponent } from "../../../../../modal/editComponent"
import { useState } from "react"
import { Modal } from "../../../../../modal/Modal"
import { FormEducation } from "../../../../../modal/forms/FormEducation"
import s from "../../profile.module.scss"
import dayjs, { Dayjs } from 'dayjs';

interface ItemProps {
    data: IEducation
    index: number
}

export const Item = ({ data, index }: ItemProps) => {
    
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div style={{position:"relative"}}>
            <hr />
            <div className={s.name}>{data?.univercity}</div>
            <div className={s.subtitle}> {data?.direction}</div>
            <div className={s.time} >{dayjs(data?.period?.start , "DD/MM/YYYY").format("MMMM, YYYY")} - {dayjs(data?.period?.end , "DD/MM/YYYY").format("MMMM, YYYY")}</div>
            <EditComponent onOpen={handleOpenModal}/>
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormEducation item={data} index={index} onClose={handleCloseModal} />} />)}
        </div>)

}