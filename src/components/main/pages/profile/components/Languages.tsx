import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../modal/editComponent"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"
import { FormLanguage } from "../../../../modal/forms/formLanguage/FormLanguage"
import { AddComponent } from "../../../../modal/AddComponent"

export const LanguagesComponent = () => {
    const data = useTypedSelector(state => state.user.user?.languages)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div className={s.userData}>
            <div className={s.title}>Languages</div>
            <div className={s.itemList}>
                <hr />
                {data?.length > 0 ?
                    <>
                        <ul>
                            {data?.map((el, i) => <li key={i}>{el?.language} - {el?.level};</li>)}
                        </ul>
                        <EditComponent onOpen={handleOpenModal} />
                        {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormLanguage onClose={handleCloseModal} userData={data} />} />)}
                    </>
                    :
                    <div>Data has been empty yet</div>}
                <AddComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormLanguage onClose={handleCloseModal} />} />)}
            </div>
        </div>
    )
}