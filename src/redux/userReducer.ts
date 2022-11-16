import { Istate } from "./models";
import { actionTypes, TypeOfAction } from "./actionTypes";


const initialState: Istate={
    user:{
        img: null,
            about: null,
            dateOfBirth: null,
            position: null,
            skills: [],
            id: '',
            address: null,
            education: [],
            experience: [],
            phone: null,
            linkedIn: null,
            facebook: null,
            gitHub: null,
            hobbies: null,
            languages: [],
            firstName:null,
            lastName:null,
            email:null,
            password:null
    //     firstName:"Natalia",
    //     lastName:"Koziar",
    //     email:"nkoziar@ukr.net",
    //     password: "454222222",
    // img:null,
    // id:"125555",
    // address: "Lviv, Ukraine",
    // education:[
    //     {univercity:"Lviv Polytechnic",
    //     direction:"Ecology and enviromental ptotection",
    //     period:"2009-2014"}],
    // about: "About me...",
    // dateOfBirth:"1992-04-18",
    // position:"FrontEnd developer",
    // skills:["html", "css3/scss", "JavaScript", "React"],
    // experience:[{
    //     company:"Lviv City Counsil",
    //     position: "Leading spetialist",
    //     period:"2017-2022"
    // }],
    // phone:"+380964586495",
    // linkedIn:"https://www.linkedin.com/in/nataliia-koziar",
    // facebook: "https://www.facebook.com/nataliia.koziar",
    // gitHub:"https://github.com/NataliaKoziar",
    // hobbies:"swimming and traweling",
    // languages:[{
    //     language:"ukrainian",
    //     level:"native"
    // },{
    //     language:"english",
    //     level:"intermediate"  
    // }]

    },
    error:null,
    loading:false
}
export const UserReducer = (state=initialState, action: TypeOfAction):Istate=>{
    switch (action.type) {
        case actionTypes.ADD_INIT:
            return {
                ...state,
                user: action.payload

            };
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload

            };
        

        default:
            return state;

    }
}