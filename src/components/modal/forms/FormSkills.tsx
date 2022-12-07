import { useTypedSelector } from "../../../common/hooks/useTypedSelector"
import { defaultSkills } from "../../../common/constants"
import { useEffect, useState } from "react"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../firebase"
import s from '../../main/pages/signUp/SignUp.module.scss'
interface FormProps {
    onClose: () => void
}

export const FormSkills = ({ onClose }: FormProps) => {
  
    const skills = useTypedSelector(state => state.user.user?.skills)
      const [currentArray, setCurrentArray] = useState(defaultSkills)
      const user = useTypedSelector(state => state.user.user)

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < defaultSkills.length; i++) {
            defaultSkills[i].status = skills.some(el => el === defaultSkills[i].name)
            arr.push(defaultSkills[i])
        }
        setCurrentArray(arr)
    }, [])

    const handleChange = (index: number) => {
        let arr = [...currentArray];
        arr[index].status = !arr[index].status
        // console.log(arr[index]);
        
        setCurrentArray(arr)
// console.log(currentArray);
    }
const handleUpdate = async()=>{
    let arr = currentArray.filter(el=>el.status === true)
    let newArr = [];
    for (let i=0; i<arr.length; i++){
        newArr.push(arr[i].name)
    }
    const docRef = doc(db, "users", user.id)
    try {
        await setDoc(docRef, {
            ...user,
            skills:newArr
        })
    } catch (e) {
        console.log(e);
    }finally{
        onClose()
    }

}
    return (
        <form >
            <h3>Your skills</h3>
            <div className={s.list}>
                  {currentArray.map((el, index) =>
                    <label key={index}><input type="checkbox"
                        name={el.name}
                        value={el.name}
                        checked={el.status}
                        onChange={() => handleChange(index)} />{el.name}</label>
                )}
            </div>
            <input type="submit" value={'Save'}
            onClick={(e)=>{
                e.preventDefault();
                handleUpdate();
            }} />
        </form>
    )
}