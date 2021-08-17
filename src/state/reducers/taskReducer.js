import axios from "axios";
import { saveList, SAVE_LIST, NEW_TASK } from "../actions/actions";
import { retrieveCookie } from "../../components/helpers/helpers";

const initialState = {
    tasks : [],
};
export const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_LIST: {
            return {...state , tasks: action.payload}
        }
        case NEW_TASK: {
            return {...state , tasks : [...state.tasks, action.payload]}
        }
        default:
            return state
    }
}

export const fetchList = () => (dispatch, getState) => {
    const token = retrieveCookie();
    let searchQuery = "", assigneeQuery = "", assignerQuery = "";
    const {filters} = getState().filters;
    if (filters.search.length > 0) {
      searchQuery = "&search=" + filters.search;
    }
    if (filters.assignee !== "") {
      assigneeQuery = "&assignee=" + filters.assignee;
    }
    if(filters.assigner !== ""){
        assignerQuery = "&assignor=" + filters.assigner;
    }
    axios
      .get(
        "http://localhost:8000/tasks/list?" +
          assigneeQuery +
          searchQuery +
          assignerQuery,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res && res.status === 200) {
          console.log(res);
          dispatch(saveList(res.data.results));
        }
      })
      .catch((error) => {
        console.log(error);
      });
}