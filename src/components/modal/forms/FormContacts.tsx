import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useTypedSelector } from '../../../common/hooks/useTypedSelector';
import { useForm } from "react-hook-form"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../firebase"

interface FormProps{
    onClose:()=>void
}

interface Contacts {
    address: string
    phone: string
    email:string
    linkedIn:string
    facebook:string
    gitHub:string
}

export const FormContacts = ({onClose}:FormProps) => {
    const user = useTypedSelector(state => state.user.user)
    console.log(user);
    
    const { register, formState: { errors, }, handleSubmit, reset, } = useForm<Contacts>();
   
    
    const editUser =async (data:Contacts) => {
        const docRef = doc(db, "users", user.id)
        try{
          await setDoc(docRef, {
            ...user,
            ...data
          })
        }catch(e){
            console.log(e);
            
        }
    }

    const onSubmit = (data: Contacts) => {
        console.log(data);
        editUser(data)
        reset()
       onClose()
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Contacts</h3>
            <TextField label="Address" defaultValue={user.address} error={(errors?.address) ? true : false}
          
             {...register("address", {
                required: true,
            })}/>
            <TextField label="Mobile phone" defaultValue={user.phone} error={(errors?.phone) ? true : false}
             {...register("phone", {
                required: true,
            })} />
           
            <TextField label="Email" value={user.email} 
             {...register("email", {
                required: true,
            })}/>
             <TextField label="LinkedIn" defaultValue={user.linkedIn} error={(errors?.linkedIn) ? true : false}
             {...register("linkedIn", {
                required: true,
            })}/>
             <TextField label="Facebook" defaultValue={user.facebook} error={(errors?.facebook) ? true : false}
             {...register("facebook", {
                required: true,
            })}/>
             <TextField label="GitHub" defaultValue={user.gitHub} error={(errors?.gitHub) ? true : false}
             {...register("gitHub", {
                required: true,
            })}/>
             <div style={{height:"20px", color:"red"}}>
                {(errors?.address || errors?.phone ||  errors?.linkedIn || errors?.gitHub) && 
                <span>{ "All field must be required !!!"}</span>}
                </div>
            <input type="submit" value={'Save'} />
        </form>)

}