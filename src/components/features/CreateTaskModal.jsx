import React, { useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../../state/reducers/taskFilterReducer";
import { createTaskForm, updateAlert } from "../../state/actions/actions";
import { createTask } from "../../state/reducers/createTaskReducer";
import Alert from "./alert";
function CreateTaskModal(props) {
  const userOptions = useSelector((state) => state.filters.users);
  const auth = useSelector((state) => state.auth.auth);
  const { form } = useSelector((state) => state.form);
  const { alert } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userOptions.length === 0) {
      dispatch(fetchUserList());
    }
  }, []);
  function handleInput(newInput) {
    dispatch(createTaskForm(newInput));
  }
  function assigneeSelect(val) {
    let obj = {
      ...form,
      assignee: val.value,
    };
    handleInput(obj);
  }
  function handleSubmit() {
    dispatch(createTask());
  }
  function closeAlert(){
      let obj = {message : [], success: 2};
      dispatch(updateAlert(obj));
  }
  var options = [];
  if (userOptions.length !== 0) {
    userOptions.forEach((el) => {
      if (el.id === auth.id) {
        options.push({ value: el.id, label: "Me" });
      } else {
        options.push({ value: el.id, label: el.name });
      }
    });
  }
  return (
    <div>
      <div
        className="modal fade"
        id="createTaskModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {alert.success === 2 ? null : (
              <div className="d-flex justify-content-center">
                <Alert alert={alert} handleClick={closeAlert} />
              </div>
            )}
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ fontWeight: "bold" }}
              >
                NEW TASK
              </h5>
              <button
                type="button"
                className="btn-close alertButton"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form noValidate>
                <div className="mb-1">
                  <label
                    htmlFor="inputTitle"
                    className="form-label"
                    style={{ color: "grey", fontSize: "medium" }}
                  >
                    Title
                  </label>
                  <input
                    className="form-control grayBorderless"
                    id="inputTitle"
                    value={form.title}
                    onChange={({ target }) => {
                      let obj = { ...form, title: target.value };
                      handleInput(obj);
                    }}
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="inputDes"
                    className="form-label"
                    style={{ color: "grey", fontSize: "medium" }}
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control grayBorderless"
                    id="inputDes"
                    value={form.description}
                    onChange={({ target }) => {
                      let obj = { ...form, description: target.value };
                      handleInput(obj);
                    }}
                    style={{ height: "100px" }}
                    rows="3"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="mb-1">
                    <label
                      htmlFor="inputDate"
                      className="form-label"
                      style={{ color: "grey", fontSize: "medium" }}
                    >
                      Due Date
                    </label>
                    <input
                      className="form-control grayBorderless"
                      id="inputDate"
                      type="datetime-local"
                      value={form.due_date}
                      onChange={({ target }) => {
                        let obj = { ...form, due_date: target.value };
                        handleInput(obj);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inputDate"
                      className="form-label"
                      style={{ color: "grey", fontSize: "medium" }}
                    >
                      Assignee
                    </label>
                    <CustomSelect
                      options={options}
                      change={assigneeSelect}
                      value={form.assignee}
                      valtrue="1"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskModal;
