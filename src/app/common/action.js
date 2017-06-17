/**
 * Created by HOANDHTB on 6/17/2017.
 */
import {API} from './api';
export  const ACTION_TYPES={
    BOOT_REQUEST:'BOOT_REQUEST',
    BOOT_SUCCESS: 'BOOT_SUCCESS',
    BOOT_FAIL:'BOOT_FAIL'
}
export function boot() {
    return {
        type: ACTION_TYPES.BOOT_REQUEST,
    };
}
export function success(student) {
    return {
        type: ACTION_TYPES.BOOT_SUCCESS,
        student,
    };
}
export function fetchData() {
    return(dispatch)=>{
        dispatch(boot());
        API.fetchStudent().then((data)=>data.json())
            .then((data)=>{
            dispatch(success(data))
            }).catch((error)=>console.log("Loi"))
    }
}