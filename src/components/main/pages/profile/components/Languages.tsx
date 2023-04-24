import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../modal/editComponent"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"
import { FormLanguage } from "../../../../modal/forms/formLanguage/FormLanguage"
import { AddComponent } from "../../../../modal/AddComponent"

export const LanguagesComponent = () => {
    const data = useTypedSelector(state => state.user.user?.languages)
    const [isModalOpen1, setModalOpen1] = useState<boolean>(false)
    const [isModalOpen2, setModalOpen2] = useState<boolean>(false)
    const handleCloseModal1 = () => setModalOpen1(false)
    const handleCloseModal2 = () => setModalOpen2(false)
    const handleOpenModal1 = () => setModalOpen1(true)
    const handleOpenModal2 = () => setModalOpen2(true)
    return (
        <div className={s.userData}>
            <div className={s.title}>Languages</div>
            <div className={s.itemList}>
                <hr />
                {data?.length>0?
                    <>
                        <ul>
                            {data?.map((el, i) => <li key={i}>{el?.language} - {el?.level};</li>)}
                        </ul>
                        <EditComponent onOpen={handleOpenModal1} />
                        {isModalOpen1 && (<Modal onClose={handleCloseModal1} children={<FormLanguage onClose={handleCloseModal1} userData={data} />} />)}
                    </>
                    :
                    <div>Data has been empty yet</div>}
                <AddComponent onOpen={handleOpenModal2} />
                {isModalOpen2 && (<Modal onClose={handleCloseModal2} children={<FormLanguage onClose={handleCloseModal2} />} />)}
            </div>
        </div>
    )
}