import defaultUser from "../../../../images/defaultUser.png"
import { AboutComponent } from "./components/About"
import { ContactsComponent } from "./components/Contacts"
import { EducationComponent } from "./components/Education"
import { ExperienceComponent } from "./components/Experiens"
import { HobbiesComponent } from "./components/Hobbies"
import { InfoComponent } from "./components/Info"
import { LanguagesComponent } from "./components/Languages"
import { SkillsComponent } from "./components/Skills"
import s from "./profile.module.scss"
import { IUser } from "../../../../redux/models"
import {useState} from "react"
import { useTypedSelector } from "../../../../common/hooks/useTypedSelector"

export const ProfileComponent = () => {
// const [user, setUser] = useState<IUser>()
const user = useTypedSelector(state=>state.user.user)
console.log(user);


    return (
        <>
            <div className={s.container}>
                <div className={s.headerContainer}>
                    <div className={s.avatar}>
                        {/* <img src={({user.img} !== null)? {user.img}: {defaultUser}}
                        width="200px" alt="avatar" /> */}
                    </div>
                    <h2>{user.firstName} {user.lastName}</h2>
                </div>
                <InfoComponent/>
                <ContactsComponent/>
                <EducationComponent/>
                <ExperienceComponent/>
                <SkillsComponent/>
                <AboutComponent/>
                <HobbiesComponent/>
                <LanguagesComponent/>
                </div>
        </>
    )
}