import TextField from '@mui/material/TextField';
import { useTypedSelector } from '../../../common/hooks/useTypedSelector';
import { useForm } from "react-hook-form"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../firebase"
import { IExperience } from '../../../redux/models';
import { BasicDateRangePicker } from '../DateRangePicker';

interface FormProps {
    onClose: () => void
    item?: IExperience
    index?: number
}



export const FormExperience = ({ item, index, onClose }: FormProps) => {
    const user = useTypedSelector(state => state.user.user)
    const title = item ? "Edit data about your experience" : "Add data about your experience"
    const { register, formState: { errors, }, handleSubmit, reset, } = useForm<IExperience>();

    // console.log(index);
    // console.log(item);



    const addUser = async (data: any) => {
        const docRef = doc(db, "users", user.id)
        let newExperience = user.experience || []
        let obj: IExperience = {
            company: data.company,
            position: data.position,
            period: {
                start: data.start,
                end: data.end
            }
        }
        //    @ts-ignore
        newExperience.push(obj)
        try {
            await setDoc(docRef, {
                ...user,
                experience: newExperience
            })
        } catch (e) {
            console.log(e);

        }
    }


    const editUser = async (data: any) => {
        const docRef = doc(db, "users", user.id)
        let newExperience = user.experience
        let obj: IExperience = {
            company: data.company,
            position: data.position,
            period: {
                start: data.start,
                end: data.end
            }
        }
        // @ts-ignore
        newExperience[index] = obj

        try {
            await setDoc(docRef, {
                ...user,
                experience: newExperience
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

        <form onSubmit={handleSubmit(onSubmit)} style={{ height: "450px", width: "450px" }}>
            <h3>{title}</h3>
            <TextField label="Company" defaultValue={item?.company || ''} error={(errors?.company) ? true : false}

                {...register("company", {
                    required: true,
                })} />
            <TextField label="Position" defaultValue={item?.position || ""} error={(errors?.position) ? true : false}
                {...register("position", {
                    required: true,
                })} />
            <BasicDateRangePicker period={item?.period || null} register={register} />

            <div style={{ height: "20px", color: "red" }}>
                {(errors?.company || errors?.position || errors?.period) &&
                    <span>{"This fields must be required !!!"}</span>}
            </div>
            <input type="submit" value={'Save'} />
        </form>
    )

}