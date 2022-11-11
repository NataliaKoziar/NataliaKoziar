import TextField from '@mui/material/TextField';
interface FormProps{
firstName:string
lastName:string
dateOfBirth:string
position:string
}

export const FormInfo : React.FC=()=>{
    return(
       
        <form >
            <TextField label="First name" />
            <TextField label="Last name"/>
            <TextField label="Date of birth"/>
            <TextField label="Position"/>
            <input type="submit" value={'Save'} />
        </form>)
       
}