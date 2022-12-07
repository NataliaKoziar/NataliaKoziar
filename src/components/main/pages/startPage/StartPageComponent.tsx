import { collection, doc, onSnapshot, setDoc, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../../../common/hooks/useTypedSelector"
import db, { auth } from "../../../../firebase"
import { userActions } from "../../../../redux/action/userActions"
import { IUser } from "../../../../redux/models"
import { SkeletonCard } from "./SkeletonCard"




export const StartPageComponent = () => {
    const loading = useTypedSelector(state => state.user.loading);
    const [users, setUsers] = useState<IUser[] | []>([]);
    const usersRef = collection(db, "users");
    const dispatch = useDispatch();

    const getData = async () => {
        let arr: IUser[]|[] = [];
        const querySnapshot = await getDocs(usersRef);
        try {
            querySnapshot.forEach((doc) => {
                // @ts-ignore
                arr.push(doc.data());
               
            })
            setUsers(arr.filter(el=>el.isPublic))
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
            <h2>Main component</h2>
            <div className="itemList">
                {users?.map((user, index) => <SkeletonCard key={index} user={user} loading={loading} />)}
            </div>
            
        </div>
    )
}