import {  IExperience } from "../../../../../../redux/models"
import { EditComponent } from "../../../../../modal/editComponent"
import { useState } from "react"
import { Modal } from "../../../../../modal/Modal"
import { FormExperience } from "../../../../../modal/forms/FormExperience"
import s from "../../profile.module.scss"
import dayjs from 'dayjs';

interface ItemProps {
    data: IExperience
    index: number
}

export const ItemEx = ({ data, index }: ItemProps) => {

    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

   
    const formatDate = (date: any) => {
        return dayjs(date, "DD/MM/YYYY").format("MMMM, YYYY")
    }
    return (
        <div style={{ position: "relative" }}>
            <hr />
            <div className={s.name}>{data?.company} </div>
            <div className={s.subtitle}> {data?.position}</div>
            <div className={s.time} >
                {formatDate(data?.period?.start)} - {formatDate(data?.period?.end)}
            </div>
            <EditComponent onOpen={handleOpenModal} />
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormExperience item={data} index={index} onClose={handleCloseModal} />} />)}
        </div>)

}