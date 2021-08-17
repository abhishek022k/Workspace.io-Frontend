import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../state/actions/actions";
import { fetchUserList } from "../../state/reducers/taskFilterReducer";
import { fetchList } from "../../state/reducers/taskReducer";
import CustomSelect from "../features/CustomSelect";
import TaskItem from "../features/TaskItem";
// import ConfirmModal from "../features/ConfirmModal.jsx";
function TaskList() {
  const { tasks } = useSelector((state) => state.tasks);
  const { filters } = useSelector((state) => state.filters);
  const userOptions = useSelector((state) => state.filters.users);
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchList());
    }
    if (userOptions.length === 0) {
      dispatch(fetchUserList());
    }
  }, []);
  function getBullets(arr) {
    return arr.map((ele) => {
      return <TaskItem key={ele.task.id} data={ele} />;
    });
  }
  function assigneeSelect(val) {
    let obj = {
      ...filters,
      assignee: val.value,
    };
    filterChange(obj);
  }
  function assignerSelect(val) {
    let obj = {
      ...filters,
      assigner: val.value,
    };
    filterChange(obj);
  }
  function filterChange(newFilters) {
    dispatch(updateFilter(newFilters));
    dispatch(fetchList());
  }
  var todoList = [],
    progressList = [],
    completedList = [],
    dueList = [],
    options = [{ value: "", label: "All" }];
  if (!(userOptions.length === 0)) {
    userOptions.forEach((el) => {
      if (el.id === auth.id) {
        options.push({ value: el.id, label: "Me" });
      } else {
        options.push({ value: el.id, label: el.name });
      }
    });
  }
  if (!(tasks.length === 0)) {
    let date = new Date();
    tasks.forEach((ele) => {
      if (ele.task.status === "COMPLETED") {
        completedList.push(ele);
      } else if (
        ele.task.status === "ASSIGNED" &&
        new Date(ele.task.due_date) >= date
      ) {
        todoList.push(ele);
      } else if (
        ele.task.status === "IN PROGRESS" &&
        new Date(ele.task.due_date) >= date
      ) {
        progressList.push(ele);
      } else {
        dueList.push(ele);
      }
    });
    todoList = getBullets(todoList);
    progressList = getBullets(progressList);
    completedList = getBullets(completedList);
    dueList = getBullets(dueList);
  }
  return (
    <div style={{ height: "93.15%" }}>
      <div className="mx-3 card border-0 h-100 p-3">
        <div className="tasklist-container-grid">
          <div className="tasklist-item1">
            <div className="d-flex justify-content-between mt-2 mb-3">
              <input
                placeholder="Search by title or description..."
                className="form-control searchBox"
                defaultValue={filters.search}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value !== filters.search) {
                      let obj = {
                        ...filters,
                        search: e.target.value,
                      };
                      filterChange(obj);
                    }
                  }
                }}
              />
              <div className="d-flex justify-content-center align-items-center">
                <p className="selectLabel">Assigner &nbsp;</p>
                <CustomSelect
                  options={options}
                  change={assignerSelect}
                  defaultVal={filters.assigner}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="selectLabel">Assignee &nbsp;</p>
                <CustomSelect
                  options={options}
                  change={assigneeSelect}
                  defaultVal={filters.assignee}
                />
              </div>
              {/* <div className="d-flex justify-content-center align-items-center">
                <p className="selectLabel">Interval &nbsp;</p>
                <CustomSelect />
              </div> */}
            </div>
            <hr style={{ border: "#f7f7f7 0.5px solid" }} />
          </div>
          <div className="tasklist-item2">
            <div className="ml-4 task-header">TODO({todoList.length})</div>
            <div className="list-area">{todoList}</div>
          </div>
          <div className="tasklist-item3">
            <div className="ml-4 task-header">
              IN PROGRESS({progressList.length})
            </div>
            <div className="list-area">{progressList}</div>
          </div>
          <div className="tasklist-item4">
            <div className="ml-4 task-header">
              COMPLETED({completedList.length})
            </div>
            <div className="list-area">{completedList}</div>
          </div>
          <div className="tasklist-item5">
            <div className="ml-4 task-header">OVERDUE({dueList.length})</div>
            <div className="list-area">{dueList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
