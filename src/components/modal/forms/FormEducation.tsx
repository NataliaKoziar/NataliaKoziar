import TextField from '@mui/material/TextField';
import { useTypedSelector } from '../../../common/hooks/useTypedSelector';
import { useForm } from "react-hook-form"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../firebase"
import { IEducation } from '../../../redux/models';
import { BasicDateRangePicker } from '../DateRangePicker';

interface FormProps {
    onClose: () => void
    item?: IEducation
    index?: number
}



export const FormEducation = ({ item, index,  onClose }: FormProps) => {
    const user = useTypedSelector(state => state.user.user)
    const title = item ? "Edit data about education" : "Add data about education"
    const { register, formState: { errors, }, handleSubmit, reset, } = useForm<IEducation>();
   
    console.log(index);
    console.log(item);
    
    
    

    const addUser = async (data: any) => {
        const docRef = doc(db, "users", user.id)
        let newEducation = user.education || []
        let obj :IEducation = {
            univercity:data.univercity,
            direction: data.direction,
            period:{
                start:data.start,
                end:data.end
            }
        }
    //    @ts-ignore
        newEducation.push(obj)
       try {
            await setDoc(docRef, {
                ...user,
               education: newEducation
            })
        } catch (e) {
            console.log(e);

        }
    }


    const editUser = async (data: any) => {
        const docRef = doc(db, "users", user.id)
        let newEducation = user.education 
        let obj :IEducation = {
            univercity:data.univercity,
            direction: data.direction,
            period:{
                start:data.start,
                end:data.end
            }
        }
        // @ts-ignore
        newEducation[index]=obj
    
       try {
            await setDoc(docRef, {
                ...user,
               education: newEducation
            })
        } catch (e) {
            console.log(e);

        }
    }

    const onSubmit = (data: any) => {
        console.log(data);
        (item !== undefined && index !==undefined) ? editUser(data) : addUser(data)      
        reset()
        onClose()
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{title}</h3>
            <TextField label="Univercity" defaultValue={item?.univercity || ''} error={(errors?.univercity) ? true : false}

                {...register("univercity", {
                    required: true,
                })} />
            <TextField label="Direction" defaultValue={item?.direction || ""} error={(errors?.direction) ? true : false}
                {...register("direction", {
                    required: true,
                })} />
                <BasicDateRangePicker period = {item?.period || null} register = {register}/>

            <div style={{ height: "20px", color: "red" }}>
                {(errors?.univercity || errors?.direction || errors?.period) &&
                    <span>{"This fields must be required !!!"}</span>}
            </div>
            <input type="submit" value={'Save'} />
        </form>
    )

}