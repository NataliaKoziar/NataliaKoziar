import { useForm } from "react-hook-form"



export const SignUpComponent: React.FC = () => {
    const {register, formState: {errors,},handleSubmit,} = useForm();

    const onSubmit = (user:object) =>  console.log(user);



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign Up</h3>
            <label>
                Fist name:
                <input {...register('firstName', {
                    required: "Поле має бути заповнене!",
                    minLength:{
                        value:2,
                        message: "Мінімум 2 символи!"
                    },
                    pattern:{
                        value: /^[A-Za-z]+$/i,
                        message: "З великої букви!"
                     }
                })} />
            </label>
          {/* @ts-ignore */}
            <div>{errors?.firstName && <p>{errors?.firstName?.message || "Invalide value!!!"}</p>}</div>
            {/* <label>
                Last name:
                <input {...register('lastName', {
                    required: "Поле має бути заповнене!",
                    minLength:{
                        value:2,
                        message: "Мінімум 2 символи!"
                    }
                })} />
            </label>
            <div>{errors?.lastName && <p>{errors?.lastName?.message || "Invalide value!!!"}</p>}</div> */}


            <input type="submit" value={'sign up'} />
        </form>

    )
}