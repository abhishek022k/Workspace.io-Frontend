import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { createTaskReducer } from "./createTaskReducer";
import { homeColReducer } from "./homeColReducer";
import { homePieReducer } from "./homePieReducer";
import { taskFilterReducer } from "./taskFilterReducer";
import { taskReducer } from "./taskReducer";

const reducers = combineReducers({
    tasks : taskReducer,
    filters : taskFilterReducer,
    auth : authReducer,
    form : createTaskReducer,
    piedata : homePieReducer,
    coldata : homeColReducer
});

export default reducers;