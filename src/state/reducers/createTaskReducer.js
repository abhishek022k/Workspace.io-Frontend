import {
  addNewTask,
  CREATE,
  createTaskForm,
  updateAlert,
  UPDATE_ALERT,
} from "../actions/actions";
import axios from "axios";
import { retrieveCookie } from "../../components/helpers/helpers";

const initialState = {
  form: { title: "", description: "", due_date: "", assignee: "" },
  alert: { message: [], success: 2 },
};
export const createTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE: {
      return { ...state, form: action.payload };
    }
    case UPDATE_ALERT: {
      return { ...state, alert: action.payload };
    }
    default:
      return state;
  }
};

export const createTask = () => (dispatch, getState) => {
  const token = retrieveCookie();
  const { form } = getState().form;
  axios
    .post("http://localhost:8000/tasks/create", form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res && res.status === 201) {
        console.log(res);
        dispatch(updateAlert({ message: res.data.message, success: 1 }));
        dispatch(
          createTaskForm({
            title: "",
            description: "",
            due_date: "",
            assignee: "",
          })
        );
        dispatch(addNewTask(res.data.results));
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
      dispatch(
        updateAlert({ message: error.response.data.message, success: 0 })
      );
    });
};
