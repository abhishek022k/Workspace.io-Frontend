import { AUTH } from "../actions/actions";

const initialState = {
    auth : {},
};
export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case AUTH: {
            return {...state , auth: action.payload}
        }
        default:
            return state
    }
}