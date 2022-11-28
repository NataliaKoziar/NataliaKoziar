import TextField from '@mui/material/TextField';
import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTypedSelector } from '../../../common/hooks/useTypedSelector';
import { useForm } from "react-hook-form"
import { doc, setDoc } from 'firebase/firestore';
import db from "../../../firebase"

interface FormProps {
    onClose: () => void
}

interface Info {
    firstName: string
    lastName: string
    dateOfBirth: string
    position: string
}

export const FormInfo = ({ onClose }: FormProps) => {
    const user = useTypedSelector(state => state.user.user)
    // console.log(user);
    let dateOfBirth = (user.dateOfBirth !== null) ? dayjs(user.dateOfBirth, 'DD/MM/YYYY').format("YYYY-MM-DD") : null



    const { register, formState: { errors, }, handleSubmit, reset, } = useForm<Info>();
    // @ts-ignore
    const [value, setValue] = React.useState<string | null>(dayjs(dateOfBirth));
   
    const editUser = async (data: Info) => {
        const docRef = doc(db, "users", user.id)
        console.log(user);
        console.log(data);


        try {
            await setDoc(docRef, {
                ...user,
                ...data,
                dateOfBirth:dayjs(value,"YYYY-MM-DD").format('DD/MM/YYYY')

            })
        } catch (e) {
            console.log(e);

        }
    }


    const onSubmit = (data: Info) => {
        console.log(data, value);
        editUser(data)
        reset()
        onClose()
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Personal information</h3>
            <TextField label="First name" defaultValue={user.firstName} error={(errors?.firstName) ? true : false}

                {...register("firstName", {
                    required: true,
                })} />
            <TextField label="Last name" defaultValue={user.lastName} error={(errors?.lastName) ? true : false}
                {...register("lastName", {
                    required: true,
                })} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <DatePicker
                        disableFuture
                        label="Day of birth"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={value}
                        inputFormat="DD/MM/YYYY"
                        onChange={(newValue) => {
                            // @ts-ignore
                            let year = newValue["$y"]
                            // @ts-ignore
                            let month = (newValue["$M"] + 1)
                            if (month < 10) {
                                month = `0${month}`
                            }
                            // @ts-ignore
                            let day = (newValue["$D"])
                            if (day < 10) {
                                day = `0${day}`
                            }
                            let newTime = year + "-" + month + "-" + day
                            // @ts-ignore
                            setValue(newTime);

                        }}
                        renderInput={(params) => <TextField {...params} error={(errors?.dateOfBirth) ? true : false}
                            {...register("dateOfBirth", {
                                required: true,
                            })} />}
                    />
                </Stack>
            </LocalizationProvider>
            <TextField label="Position" defaultValue={user.position} error={(errors?.position) ? true : false}
                {...register("position", {
                    required: true,
                })} />
            <div style={{ height: "20px", color: "red" }}>
                {(errors?.firstName || errors?.lastName || errors?.dateOfBirth || errors?.position) &&
                    <span>{"All field must be required !!!"}</span>}
            </div>
            <input type="submit" value={'Save'} />
        </form>)

}