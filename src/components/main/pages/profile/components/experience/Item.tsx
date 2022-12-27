import { IExperience } from "../../../../../../redux/models"
import { EditComponent } from "../../../../../modal/editComponent"
import { useState } from "react"
import { Modal } from "../../../../../modal/Modal"
import { FormExperience } from "../../../../../modal/forms/FormExperience"
import { RemoveComponent } from "../../../../../modal/RemoveComponent"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../../../../firebase"
import s from "../../profile.module.scss"
import dayjs from 'dayjs';
import { useTypedSelector } from "../../../../../../common/hooks/useTypedSelector"

interface ItemProps {
    data: IExperience
    index: number
}

export const ItemEx = ({ data, index }: ItemProps) => {
    const user = useTypedSelector(state => state.user.user)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    const handleRemoveElement = async () => {
        const docRef = doc(db, "users", user.id)
        let array = user.experience.filter((el, i) => i !== index)
        try {
            await setDoc(docRef, {
                ...user,
                experience: array
            })
        } catch (e) {
            console.log(e);
        }

    }

    const formatDate = (date: any) => {
        return dayjs(date, "DD/MM/YYYY").format("MMMM, YYYY")
    }
    return (
        <div className={s.item_description} style={{ position: "relative" }}>
            <hr />
            <div className={s.name}>{data?.company} </div>
            <div className={s.subtitle}> {data?.position}</div>
            <div className={s.time} >
                {formatDate(data?.period?.start)} - {formatDate(data?.period?.end)}
            </div>
            <div className={s.edit}>
                <RemoveComponent removeElement={handleRemoveElement} />
                <EditComponent onOpen={handleOpenModal} />
            </div>
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormExperience item={data} index={index} onClose={handleCloseModal} />} />)}
        </div>)

}