import { useParams, useNavigate} from "react-router-dom";
import s from "./CvComponent.module.scss"
import { IUser } from "../../../../redux/models"
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"
import db from "../../../../firebase"
import { defaultUser } from "../../../../common/constants";
import dayjs from 'dayjs';
import { LoadingConponent } from "../../../modal/LoadingComponent";
import { Modal } from "../../../modal/Modal";


export const CvComponent = () => {
    const [user, setUser] = useState<IUser>(defaultUser);
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams();
    const navigate = useNavigate()

    const docRef = doc(db, "users", `${id}`);

    const getUser = async () => {
        const docSnap = await getDoc(docRef);
        try {
            if (docSnap.exists()) {
                // @ts-ignore
                setUser(docSnap.data());
            }
        } catch (e) {
            console.log(e);
        } finally { setLoading(false) }
    }

    const formatDate = (date: any) => {
        return dayjs(date, "DD/MM/YYYY").format("MMMM, YYYY")
    }

    useEffect(() => {
        setLoading(true)
        getUser()
    }, [id])


    return (
        <>
            {loading && <Modal children={<LoadingConponent />}></Modal>}
            {!loading && <>
                <div className={s.overlay} onClick={() => navigate(-1)}></div>
                <div className={s.container}>
                    <div className={s.headerContainer} ></div>
                    <div className={s.leftSide}>
                        <div className={s.box}>
                            {user?.img && <div className={s.avatar} style={{ backgroundImage: `url(${user?.img})` }}></div>}
                        </div>
                        {user?.about && <div className={s.box}>
                            <div className={s.title}>ABOUT</div>
                            <p>{user?.about} </p>
                        </div>}
                        <div className={s.box}>
                            <div className={s.title}>CONTACTS</div>
                            {user?.address && <div className={s.info}>
                                <HomeIcon /> {user?.address}
                            </div>}
                            {user?.phone && <div className={s.info}>
                                <PhoneIcon /> {user?.phone}
                            </div>}
                            {user?.email && <div className={s.info}>
                                <EmailIcon />
                                {user?.email}
                            </div>}
                            {user?.linkedIn && <div className={s.info}>
                                <LinkedInIcon />
                                <a href={user?.linkedIn} rel="noreferrer" target="_blank">@{user?.firstName}.linkedIn</a>
                            </div>}
                            {user?.facebook && <div className={s.info}>
                                <FacebookIcon />
                                <a href={user?.facebook} rel="noreferrer" target="_blank">@{user?.firstName}.facebook</a>
                            </div>}
                            {user?.gitHub && <div className={s.info}>
                                <GitHubIcon />
                                <a href={user?.gitHub} rel="noreferrer" target="_blank">@{user?.firstName}.gitHub</a>
                            </div>}

                        </div>
                        {(user?.skills.length > 0) &&
                            <div className={s.box}>
                                <div className={s.title}>SKILLS</div>
                                <ul>
                                    {user?.skills.map((el, i) => <li key={i}>{el}</li>)}
                                </ul>
                            </div>}
                        {(user?.languages.length > 0) &&
                            <div className={s.box}>
                                <div className={s.title}>LANGUAGES</div>
                                <ul>
                                    {user?.languages.map((el, i) => <li key={i}>{el.language} - {el.level}</li>)}
                                </ul>
                            </div>}
                    </div>

                    <div className={s.rightSide}>
                        <div className={s.box} id={s.title_cv}>
                            <div className={`${s.title} ${s.size30}`}> {user.firstName?.toUpperCase()} {user.lastName?.toUpperCase()}</div>
                            <div className={s.subtitle}>{user.position?.toUpperCase()}</div>
                        </div>
                        {(user?.education.length > 0) && <div className={s.box}>
                            <div className={s.title}>EDUCATION</div>
                            {user?.education.map((el, i) => <div className={s.item} key={i}>
                                <div className={s.item_title}>{el.univercity} </div>
                                <div className={s.item_subtitle}>{el.direction}</div>
                                <div className={s.item_period}> {formatDate(el.period?.start)} - {formatDate(el.period?.end)}</div>
                            </div>)}
                        </div>}
                        {(user?.experience.length > 0) && <div className={s.box}>
                            <div className={s.title}>EXPERIENCE</div>
                            {user?.experience.map((el, i) => <div className={s.item} key={i}>
                                <div className={s.item_title}>{el.company} </div>
                                <div className={s.item_subtitle}>{el.position}</div>
                                <div className={s.item_period}>{formatDate(el.period?.start)} - {formatDate(el.period?.end)}</div>
                            </div>)}
                        </div>}
                        <div className={s.box}>
                            {user?.hobbies && <>
                                <div className={s.title}>HOBBIES</div>
                                <p>{user?.hobbies}</p>
                            </>}
                        </div>
                    </div>
                    <div className={s.footerContainer}></div>

                </div>
            </>}
        </>
    )
}