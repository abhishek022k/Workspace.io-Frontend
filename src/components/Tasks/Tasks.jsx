import React from "react";
import { Switch, Route } from "react-router";
import TaskNav from "../features/TaskNav";
import { useRouteMatch } from "react-router";
import TaskStats from "./TaskStats";
import TaskList from "./TaskList";
import TaskArchives from "./TaskArchives";
import CreateTaskModal from "../features/CreateTaskModal";
function Tasks() {
  const { path } = useRouteMatch();
  return (
    <div style={{ width: "84%" }}>
      <div className="d-flex justify-content-between align-items-center">
        <TaskNav />
        <div className="mr-4">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createTaskModal"
            style={{letterSpacing:"2.5px"}}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <CreateTaskModal/>
      <Switch>
        <Route exact path={path} component={TaskList} />
        <Route path={`${path}/archives`} component={TaskArchives} />
        <Route path={`${path}/overview`} component={TaskStats} />
      </Switch>
    </div>
  );
}

export default Tasks;
