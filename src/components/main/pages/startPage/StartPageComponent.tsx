import Button from "@mui/material/Button"
import homeimg from "../../../../images/homepage.png"
import { collection,  getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useTypedSelector } from "../../../../common/hooks/useTypedSelector"
import { AppRoutes } from "../../../../common/Routes"
import db, { auth } from "../../../../firebase"
import { userActions } from "../../../../redux/action/userActions"
import { IUser } from "../../../../redux/models"
import { SkeletonCard } from "./SkeletonCard"
import s from './StartPage.module.scss'
import { useAuthState } from "react-firebase-hooks/auth"




export const StartPageComponent = () => {
    const [account] = useAuthState(auth)
    const loading = useTypedSelector(state => state.user.loading);
    const [users, setUsers] = useState<IUser[] | []>([]);
    const usersRef = collection(db, "users");
    const dispatch = useDispatch();
    let text = !account ? 'Start building your own career now' : 'Welcome!'

    const getData = async () => {
        let arr: IUser[] | [] = [];
        const querySnapshot = await getDocs(usersRef);
        try {
            querySnapshot.forEach((doc) => {
                // @ts-ignore
                arr.push(doc.data());

            })
            setUsers(arr.filter(el => el.isPublic))
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        dispatch(userActions.setLoading(true))
        getData()
        const timer = setTimeout(() => {
            dispatch(userActions.setLoading(false));
        }, 2000);
        return () => clearTimeout(timer)
    }, [])


    return (
        <div>
            <div className={s.section}>
                <div className={s.creative}>
                    <h2>{text}</h2>
                    {account && <p>Here is the place where employers are already looking for your talent and experience</p>}
                    {!account && <Link to={AppRoutes.SIGN_UP} style={{ color: "white", textDecoration: "none" }}>
                        <Button variant="contained" size="large">Sign Up</Button>
                    </Link>}
                </div>
                <img src={homeimg} alt="homePage" />
            </div>
            <div className={s.itemList}>
                <h2>New Candidates </h2>
              
                {users?.map((user, index) => <SkeletonCard key={index} user={user} loading={loading} />)}
            </div>
            

        </div>
    )
}