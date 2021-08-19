import { UPDATE_COL, updateCol} from "../actions/actions";
import axios from "axios";
import { retrieveCookie } from "../../components/helpers/helpers";

const initialState = {
  coldata: [],
};
export const homeColReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COL: {
      return { ...state, coldata: action.payload };
    }
    default:
      return state;
  }
};

export const fetchColData = () => (dispatch, getState) => {
  const token = retrieveCookie();
  axios
    .get("http://localhost:8000/tasks/col", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res && res.status === 200) {
        console.log(res);
        dispatch(updateCol(res.data.results));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
