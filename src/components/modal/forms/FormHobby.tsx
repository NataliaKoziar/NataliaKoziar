import { useState } from "react"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../firebase"
import { useTypedSelector } from '../../../common/hooks/useTypedSelector';
import s from "../../main/pages/signUp/SignUp.module.scss"

interface FormProps {
    onClose: () => void
    data: string | null
}

export const FormHobby = ({ data, onClose }: FormProps) => {
    const user = useTypedSelector(state => state.user.user)
    const [value, setValue] = useState(data)

    const editData = async (value: string | null) => {
        const docRef = doc(db, "users", user.id)
        try {
            await setDoc(docRef, {
                ...user,
                hobbies: value
            })
        } catch (e) {
            console.log(e);
        }finally{
            onClose()
        }
    }



    return (
        <form style={{height:"450px", width:"550px"}}>
            <h3>Add some description about your hobbies</h3>
            {/* @ts-ignore */}
            <textarea cols="60" rows="10" placeholder="Let's add your summary" value={value} onChange={(e) => setValue(e.target.value)}/>
           
            <input className={s.btn} type={"button"} value = {"Save"} onClick={(e)=>{
                e.preventDefault();
                editData(value);
            }}/>
        </form>
    )
}