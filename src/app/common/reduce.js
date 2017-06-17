import  {ACTION_TYPES} from './action'

const initialState = {
    booted: false,
    student: {}
}
export default function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_TYPES.BOOT_REQUEST:
            return {
                ...state,
                student: {}
            };
        case ACTION_TYPES.BOOT_SUCCESS:
            return{
                ...state,
                student:action.student,
                booted:true
            }
        default:
            return state;
    }
}