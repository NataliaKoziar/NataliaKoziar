import { useTypedSelector } from "../../../../common/hooks/useTypedSelector"
import { useForm, useFieldArray } from "react-hook-form"
import { ILanguage } from "../../../../redux/models";
import s from "./formLan.module.scss"
import { SelectGroup } from "./Select";
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../../firebase"

interface FormProps {
    onClose: () => void
    userData?: ILanguage[]

}
type FormValues = {
    data: ILanguage[] | [];
};

export const FormLanguage = ({ userData, onClose }: FormProps) => {
  
    const user = useTypedSelector(state => state.user.user)
    const title = userData ? "Edit data about languages" : "Add data about languages"
    const btn = userData ? "Save" : "Add"
  
    const { control, handleSubmit, register } = useForm<FormValues>({
        defaultValues: {
            data: userData || []
        },
        mode: 'onSubmit',
        shouldUnregister: false,
    });
    const { fields, remove } = useFieldArray({
        control,
        name: 'data',
    });



    const addLanguage = async (data: FormValues) => {
        const docRef = doc(db, "users", user.id)
        let array = user.languages || []
        // @ts-ignore
        let obj: ILanguage = data.data[0]
        // @ts-ignore
        array.push(obj)
        try {
            await setDoc(docRef, {
                ...user,
                languages: array
            })
        } catch (e) {
            console.log(e);
        }
        }
    
        const editLanguage = async (data: FormValues) => {
            const docRef = doc(db, "users", user.id)
            
            try {
                await setDoc(docRef, {
                    ...user,
                    languages: data.data
                })
            } catch (e) {
                console.log(e);
            }
            }

    const onSubmit = (data: FormValues) => {
       
       userData? editLanguage(data):
        addLanguage(data)
        onClose()

    }

    


    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} >
            <h3>{title}</h3>
            <div className={s.fields}>
            {userData && fields.map((data, index) => (<SelectGroup key={data.id} register={register} item={data} index={index} remove={remove} />))}
            {!userData && <SelectGroup register={register} />}
            </div>
            <input type="submit" value={btn} />
        </form>
    )
}