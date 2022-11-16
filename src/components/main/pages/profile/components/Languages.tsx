import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../modal/editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"

export const LanguagesComponent = () => {
    const data = useTypedSelector(state=>state.user.user?.languages)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div className={s.userData}>
            <div className={s.title}>Languages</div>
            <div className={s.itemList}>
               <hr/>
                {data?.length > 0 ?
                <ul>
                    {data?.map((el, i) => <li key={i}>{el?.language}-  {el?.level};</li>)}
                </ul>:
                <div>Data has been empty yet</div>}
              
                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo onClose={handleCloseModal}/>} />)}
            </div>
        </div>
    )
}