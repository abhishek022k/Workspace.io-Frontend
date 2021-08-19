import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchList } from "./../state/reducers/taskReducer";
import DailyTaskItem from "./features/dailyTaskItem";
import PieChart from "./features/PieChart";
import { fetchPieData } from "../state/reducers/homePieReducer";
import ColumnChart from "./features/ColumnChart";
import { fetchColData } from "../state/reducers/homeColReducer";
function Homepage() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { auth } = useSelector((state) => state.auth);
  const {piedata} = useSelector((state) => state.piedata);
  const {coldata} = useSelector((state)=> state.coldata);
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchList());
    }
    if(piedata.length === 0){
      dispatch(fetchPieData());
    }
    if(coldata.length === 0){
      dispatch(fetchColData());
    }
  }, []);
  function getBullets(arr) {
    return arr.map((ele) => {
      return <DailyTaskItem key={ele.task.id} data={ele} />;
    });
  }
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
    })
  }
  dailyList = getBullets(dailyList);
  return (
    <div style={{ width: "84%" }}>
      <div style={{ height: "100%" }} className="ml-3">
        <div className="homepage-container-grid px-2">
          <p className="m-0 font-weight-bold homepage-grid-1">
            Tasks for Today
          </p>
          <div className=" homepage-grid-2">
            
              {dailyList.length === 0 ? (<div className="daily-list-area card border-0 justify-content-center">
                <p style={{ color: "grey" }} className="align-self-center">
                  No Tasks Scheduled for today
                </p></div>
              ) : (
                <div className="daily-list-area card border-0">{dailyList}</div>
              )}
            </div>
          <p className="m-0 font-weight-bold" style={{gridColumn:"2/3", gridRow:"2/3", paddingLeft: "20px"}}>My Performance</p>
          <div className="homepage-grid-3  daily-list-area card border-0" id="chart1">
            <PieChart data={piedata}/>
          </div>
          <div className="homepage-grid-4 card border-0 m-0" id="chart2">
            <ColumnChart data={coldata}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
