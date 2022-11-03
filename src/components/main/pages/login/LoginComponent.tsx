import { Link } from "react-router-dom"
import { AppRoutes } from "../../../../common/Routes"
export const LoginComponent: React.FC = ()=>{
    return(
        <>
       <div>LoginComponent</div> 
       <Link to={AppRoutes.SIGN_UP}>
       <button>Sign up</button>
       </Link>
        </>
    )
}