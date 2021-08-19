import { UPDATE_PIE, updatePie } from "../actions/actions";
import axios from "axios";
import { retrieveCookie } from "../../components/helpers/helpers";

const initialState = {
  piedata: [],
};
export const homePieReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PIE: {
      return { ...state, piedata: action.payload };
    }
    default:
      return state;
  }
};

export const fetchPieData = () => (dispatch, getState) => {
  const token = retrieveCookie();
  axios
    .get("http://localhost:8000/tasks/pie", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res && res.status === 200) {
        console.log(res);
        dispatch(updatePie(res.data.results));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
