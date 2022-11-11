import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"

export const EducationComponent = () => {
    const data = useTypedSelector(state=>state.user.user.education)
    console.log(data);
    
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div className={s.userData}>
            <div className={s.title}>Education</div>
            <div className={s.itemList}>
                <div>
                    <div className="description">Lviv Polytechnic National Univercity</div>
                    <div> Ecology</div>
                    <div >2014-2020</div>
                </div>
                {/* <div className={s.item}>
                    <div className="category">Direction:</div>
                    <div className="description">Enviromental protection</div>
                </div>
                <div className={s.item}>
                    <div className="category">Period:</div>
                    <div className="description">2009-2015</div>
                </div> */}
                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo />} />)}
            </div>
        </div>
    )
}