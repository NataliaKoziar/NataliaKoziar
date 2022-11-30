import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../modal/editComponent"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"
import { FormContacts } from "../../../../modal/forms/FormContacts"


export const ContactsComponent = () => {
    const user = useTypedSelector(state=>state.user.user)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)

    return (
        <div className={s.userData}>
            <div className={s.title}>Contacts</div>
            <div className={s.itemList}>
                <hr/>
                <div className={s.item}>
                    <div className={s.category}>Address:</div>
                    <div className="description">{user?.address}</div>
                </div>
                <div className={s.item}>
                    <div className={s.category}>Mobile phone:</div>
                    <div className="description">{user?.phone}</div>
                </div>
                <div className={s.item}>
                    <div className={s.category}>Email:</div>
                    <div className="description">{user?.email}</div>
                </div>
                <div className={s.item}>
                    <div className={s.category}>LinkedIn:</div>
                    <div className="description">{user?.linkedIn}</div>
                </div>
                <div className={s.item}>
                    <div className={s.category}>Facebook:</div>
                    <div className="description">{user?.facebook}</div>
                </div>
                <div className={s.item}>
                    <div className={s.category}>GitHub:</div>
                    <div className="description">{user?.gitHub}</div>
                </div>

                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormContacts onClose={handleCloseModal}/>} />)}
            </div>
        </div>
    )
}