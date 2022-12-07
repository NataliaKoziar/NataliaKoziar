import defaultUser from "../../../../images/defaultUser.png"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { userActions } from "../../../../redux/action/userActions"
import { AboutComponent } from "./components/About"
import { ContactsComponent } from "./components/Contacts"
import { EducationComponent } from "./components/education/Education"
import { ExperienceComponent } from "./components/experience/Experiens"
import { HobbiesComponent } from "./components/Hobbies"
import { InfoComponent } from "./components/Info"
import { LanguagesComponent } from "./components/Languages"
import { SkillsComponent } from "./components/Skills"
import s from "./profile.module.scss"
import { useTypedSelector } from "../../../../common/hooks/useTypedSelector"
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import db, { auth } from "../../../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { PhotoMenuComponent } from "../../../modal/photoMenu/PhotoMenuComponent"
import { LoadingConponent } from "../../../modal/LoadingComponent"
import { Modal } from "../../../modal/Modal"

export const ProfileComponent = () => {

    const [account, loading] = useAuthState(auth)
    const user = useTypedSelector(state => state.user.user)
    const [isPublic, setPublic] = useState(user?.isPublic)
    const userRef = collection(db, "users")
    const dispatch = useDispatch()
    console.log(user);
    

    const handlePublicCv = async()=>{
        setPublic((prev)=>!prev)
        const docRef = doc(db, "users", user.id)
        try {
            await setDoc(docRef, {
                ...user,
                isPublic
            })
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        onSnapshot(userRef, (snapshot) => {
            // @ts-ignore          
            dispatch(userActions.addInit(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(el => el.id === account?.uid)[0]
            ))
        })

    }, [account])


    return (
        <>
            {loading && <Modal children={<LoadingConponent />}></Modal>}
            {!loading && user &&
                <div className={s.container}>
                    <div className={s.headerContainer}>
                        <div className={s.avatar} style={{ backgroundImage: `url(${user?.img || defaultUser})` }}>
                            <PhotoMenuComponent />
                        </div>
                        <h2>{user?.firstName} {user?.lastName}</h2>
                        <button className={s.btn} onClick={handlePublicCv}> {user?.isPublic ? 'Hide CV' : "Public CV"}</button>
                    </div>
                    <InfoComponent />
                    <ContactsComponent />
                    <EducationComponent />
                    <ExperienceComponent />
                    <SkillsComponent />
                    <AboutComponent />
                    <HobbiesComponent />
                    <LanguagesComponent />
                </div>}
        </>
    )
}