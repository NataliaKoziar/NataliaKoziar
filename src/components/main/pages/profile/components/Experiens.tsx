import s from "../profile.module.scss"
import { useState } from "react"
import { EditComponent } from "../../../../modal/editComponent"
import { FormInfo } from "../../../../modal/forms/FormInfo"
import { Modal } from "../../../../modal/Modal"
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector"

export const ExperienceComponent = () => {
    const data = useTypedSelector(state=>state.user.user?.experience)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleCloseModal = () => setModalOpen(false)
    const handleOpenModal = () => setModalOpen(true)


    return (
        <div className={s.userData}>
            <div className={s.title}>Experience</div>
            <div className={s.itemList}>
            {(data?.length>0) ? data?.map((el, i)=>
                <div key={i}>
                    <hr/>
                    <div className={s.name}>{el?.company}</div>
                    <div className={s.subtitle}> {el?.position}</div>
                    <div className={s.time} >{el?.period}</div>
                </div>): <div>Data has been empty yet</div>}
                {/* <div className={s.item}>
                    <div className="category">Company:</div>
                    <div className="description">Lviv City Counsil</div>
                </div>
                <div className={s.item}>
                    <div className="category">Position:</div>
                    <div className="description">spetialist of waste management</div>
                </div>
                <div className={s.item}>
                    <div className="category">Period:</div>
                    <div className="description">2017-2022</div>
                </div> */}
                <EditComponent onOpen={handleOpenModal} />
                {isModalOpen && (<Modal onClose={handleCloseModal} children={<FormInfo onClose={handleCloseModal} />} />)}
            </div>
        </div>
    )
}