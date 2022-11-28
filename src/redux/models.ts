export interface IUser{
    firstName:string|null
    lastName:string|null
    img:string | null
    id:string
    address:string|null
    education:IEducation[] |[]
    about:string | null
    dateOfBirth:string | null
    email:string | null
    password:string|null
    position:string | null
    skills:string[] |[]
    experience:IExperience[]|[]
    phone:string|null
    linkedIn:string|null
    facebook: string|null
    gitHub:string|null
    hobbies:string|null
    languages:ILanguage[]|[]

}
export interface IEducation{
    univercity:string|null
    direction:string | null
    period:{
        start:string | null
        end:string | null
    }|null
}
export interface IExperience{
    company:string|null
    position:string | null
    period:{
        start:string | null
        end:string | null
    }|null
}
export interface ILanguage{
    language:string 
    level:string 
}





export interface Istate{
    user:IUser
    error:null
    loading:boolean
}