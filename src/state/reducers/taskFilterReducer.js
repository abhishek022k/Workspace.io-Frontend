import { UPDATE_FILTER, options, OPTIONS } from "../actions/actions";
import axios from "axios";
import { retrieveCookie } from "../../components/helpers/helpers";

const initialState = {
    filters : {search : "" , assignee: "", assigner: ""},
    users : []
};
export const taskFilterReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_FILTER : {
            return {...state , filters: action.payload}
        }
        case OPTIONS : {
            return {...state , users: action.payload}
        }
        default:
            return state
    }
}

export const fetchUserList = () => (dispatch, getState) => {
    const token = retrieveCookie();
    axios
      .get(
        "http://localhost:8000/users/list-all",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res && res.status === 200) {
          console.log(res);
          dispatch(options(res.data.results));
        }
      })
      .catch((error) => {
        console.log(error);
      });
}