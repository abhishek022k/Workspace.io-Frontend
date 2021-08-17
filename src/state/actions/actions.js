export const SAVE_LIST = "SAVE_LIST"
export const UPDATE_FILTER = "UPDATE_FILTER"
export const OPTIONS = "SAVE_USER_OPTIONS"
export const AUTH = "SET_AUTH"
export const CREATE = "CREATE_TASK"
export const NEW_TASK = "ADD_NEW_TASK_TO_LIST"
export const UPDATE_ALERT = "UPDATE_ALERT"
export const saveList = (tasks) => ({
  type: SAVE_LIST,
  payload: tasks,
});
export const updateFilter = (filters) => ({
  type: UPDATE_FILTER,
  payload: filters,
});
export const options = (options) => ({
    type : OPTIONS,
    payload: options
})
export const setAuth = (auth) => ({
    type : AUTH,
    payload : auth
});
export const createTaskForm = (form) => ({
    type : CREATE,
    payload : form
});
export const addNewTask = (task) => ({
    type : NEW_TASK,
    payload : task
});
export const updateAlert = (alert) => ({
    type : UPDATE_ALERT,
    payload : alert
});