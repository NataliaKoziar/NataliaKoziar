import { Link } from "react-router-dom"
import { AppRoutes } from "../../../../common/Routes"
import TextField from '@mui/material/TextField';
import { useForm, } from "react-hook-form"
import { signInWithEmailAndPassword } from "firebase/auth"
import s from "../signUp/SignUp.module.scss"
import db, { auth } from "../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"



interface Login {
    email: string
    password: string
}


export const LoginComponent: React.FC = () => {
    const { register, formState: { errors, }, handleSubmit, reset, } = useForm<Login>();
    const navigate = useNavigate();
    // const [account] = useAuthState(auth)


    const handleLogin = async (data: Login) => {
        try {
            
            const user = await signInWithEmailAndPassword(auth, data.email, data.password)
            navigate(AppRoutes.PROFILE)
            // navigate(AppRoutes.PROFILE + account?.uid)
        } catch (e) {
            console.log(e);
            navigate(AppRoutes.NOT_FOUND)
        }
    }

    const onSubmit = (data: Login) => {
        reset()
        handleLogin(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{height:"400px"}}>
            <h3>LogIn</h3>
            <TextField label="Email"
                {...register("email", {
                    required: "This field is required!",
                })} />
            <TextField label="Password" type="password"
                {...register("password", {
                    required: "This field is required!",
                })} />
            <div className={s.message}>{(errors?.email || errors?.password) && <p> "Invalide email or password!!!"</p>}</div>
            <input type="submit" value={'Sign in'} />
            <p>If you don`t have an account, please
                <Link to={AppRoutes.SIGN_UP} >
                    <span> Sign up</span>
                </Link>
            </p>
        </form>
    )
}