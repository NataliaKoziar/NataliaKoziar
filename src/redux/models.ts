export interface IUser{
    firstName:string|null
    lastName:string|null
    img:string | null
    id:string
    address:string|null
    education:IEducation[] |[ null]
    about:string | null
    dateOfBirth:string | null
    email:string | null
    password:string
    position:string | null
    skills:string[] |[null]
    experience:IExperience[]|[null]
    phone:string|null
    linkedIn:string|null
    facebook: string|null
    gitHub:string|null
    hobbies:string|null
    languages:ILanguage[]|[null]

}
export interface IEducation{
    univercity:string
    direction:string
    period:string
}
export interface IExperience{
    company:string
    position:string
    period:string
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