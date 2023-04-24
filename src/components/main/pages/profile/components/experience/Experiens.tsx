import s from "../../profile.module.scss"
import { useState } from "react"
import { Modal } from "../../../../../modal/Modal"
import { useTypedSelector } from "../../../../../../common/hooks/useTypedSelector"
import { AddComponent } from "../../../../../modal/AddComponent"
import { FormExperience } from "../../../../../modal/forms/FormExperience"
import { ItemEx } from "./Item"

export const ExperienceComponent = () => {
    const data = useTypedSelector(state=>state.user.user?.experience)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    

    return (
        <div className={s.userData}>
            <div className={s.title}>Experience</div>
            <div className={s.itemList}>
            {(data?.length > 0) ? data?.map((el, i) =>
                    <ItemEx data={el} index={i} key={i} />) :
                    <>
                        <hr />
                        <div>Data has been empty yet</div>
                        <br />
                    </>}
                <AddComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormExperience onClose={handleCloseModal} />} />)}
            </div>
        </div>
    )
}