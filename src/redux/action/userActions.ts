import { actionTypes } from "../actionTypes";
import { IUser } from "../models";

export const userActions = {
    addInit: (payload:IUser)=>({type:actionTypes.ADD_INIT, payload}),
    setLoading: (payload:boolean)=>({type:actionTypes.LOADING, payload}),
}