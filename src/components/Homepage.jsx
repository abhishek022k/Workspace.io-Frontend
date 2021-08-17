import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchList } from "./../state/reducers/taskReducer";
import DailyTaskItem from "./features/dailyTaskItem";

function Homepage() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchList());
    }
  }, []);
  function getBullets(arr) {
    return arr.map((ele) => {
      return <DailyTaskItem key={ele.task.id} data={ele} />;
    });
  }
  console.log(tasks);
  console.log(auth);
  var dailyList = [];
  if (!(tasks.length === 0)) {
    let date = new Date();
    tasks.forEach((ele) => {
      if (ele.assignee.id === auth.id) {
        if (ele.task.status === "IN PROGRESS") {
          dailyList.push(ele);
        } else if (
          (ele.task.status === "IN PROGRESS" ||
            ele.task.status === "ASSIGNED") &&
          new Date(ele.task.due_date) <= date
        ) {
          dailyList.push(ele);
        }
      }
    });
  }
  dailyList = getBullets(dailyList);
  return (
    <div style={{ width: "84%" }}>
      <div style={{ height: "100%" }} className="ml-3">
        <div className="detail-container-grid px-2">
          <div className="homepage-grid-1">
            <p className="m-0 font-weight-bold">Tasks for Today</p>
            <div className="daily-list-area card border-0 justify-content-center">
            {(dailyList.length === 0) ? <p style={{color:"grey"}} className="align-self-center">No Tasks Scheduled for today</p> :            
            <div>{dailyList}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
