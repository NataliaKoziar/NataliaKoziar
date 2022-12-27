import { IEducation, IExperience } from "../../../../../../redux/models"
import { EditComponent } from "../../../../../modal/editComponent"
import { useState } from "react"
import { Modal } from "../../../../../modal/Modal"
import { FormEducation } from "../../../../../modal/forms/FormEducation"
import s from "../../profile.module.scss"
import dayjs, { Dayjs } from 'dayjs';
import { RemoveComponent } from "../../../../../modal/RemoveComponent"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../../../../firebase"
import { useTypedSelector } from "../../../../../../common/hooks/useTypedSelector"

interface ItemProps {
    data: IEducation
    index: number
}

export const Item = ({ data, index }: ItemProps) => {

    const user = useTypedSelector(state => state.user.user)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    const handleRemoveElement = async () => {
        const docRef = doc(db, "users", user.id)
        let array = user.education.filter((el, i) => i !== index)
        try {
            await setDoc(docRef, {
                ...user,
                education: array
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
            <div className={s.name}>{data?.univercity} </div>
            <div className={s.subtitle}> {data?.direction}</div>
            <div className={s.time} >
                {formatDate(data?.period?.start)} - {formatDate(data?.period?.end)}
            </div>
            <div className={s.edit}>
                <RemoveComponent removeElement = {handleRemoveElement}/>
            <EditComponent onOpen={handleOpenModal} />
            </div>
            {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormEducation item={data} index={index} onClose={handleCloseModal} />} />)}
        </div>)

}