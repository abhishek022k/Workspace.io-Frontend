import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { createTaskReducer } from "./createTaskReducer";
import { taskFilterReducer } from "./taskFilterReducer";
import { taskReducer } from "./taskReducer";

const reducers = combineReducers({
    tasks : taskReducer,
    filters : taskFilterReducer,
    auth : authReducer,
    form : createTaskReducer,
});

export default reducers;