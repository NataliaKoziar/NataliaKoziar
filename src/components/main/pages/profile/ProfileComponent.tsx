import defaultUser from "../../../../images/defaultUser.png"
import { useEffect } from "react"
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
import { collection, doc, onSnapshot } from "firebase/firestore"
import db, { auth } from "../../../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

export const ProfileComponent = () => {

    const [account, loading] = useAuthState(auth)


    const user = useTypedSelector(state => state.user.user)
    const userRef = collection(db, "users")
    const dispatch = useDispatch()
    console.log("account:", account);


    useEffect(() => {
        dispatch(userActions.setLoading(true));

        onSnapshot(userRef, (snapshot) => {
            // @ts-ignore          
            dispatch(userActions.addInit(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(el => el.email === account?.email)[0]
            ))
            // console.log(user);

        })
        dispatch(userActions.setLoading(false));
    }, [account])


    return (
        <>
            {loading && <h2>Loading...</h2>}
            {!loading && user &&
                <div className={s.container}>
                    <div className={s.headerContainer}>
                        <div className={s.avatar}>
                            <img src={user?.img || defaultUser}
                                width="200px" alt="avatar" />
                        </div>
                        <h2>{user?.firstName} {user?.lastName}</h2>
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