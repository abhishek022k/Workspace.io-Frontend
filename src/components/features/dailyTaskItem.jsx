import React from "react";
import { Link } from "react-router-dom";
import { getFormattedDate, getFormattedTime } from "../helpers/helpers";

function dailyTaskItem(props) {
  const due_date = getFormattedDate(props.data.task.due_date);
  const created = getFormattedDate(props.data.task.created_at);
  const due_time = getFormattedTime(props.data.task.due_date);
  let color = "blue";
  let date = new Date();
  if (new Date(props.data.task.due_date) <= date) {
    color = "red";
  }
  return (
    <div className="d-flex mb-3 mt-2">
      <div
        style={{
          width: "18%",
          fontStyle: "italic",
          color: "#767676",
          paddingLeft: "5px",
        }}
        className="d-flex flex-column"
      >
        <div style={{ lineHeight: "14px", paddingTop: "5px" }}>{due_time}</div>
        <div style={{ fontSize: "12px", paddingTop: "10px" }}>{due_date}</div>
      </div>
      <div
        style={{ width: "67%" }}
        className="d-flex flex-column"
      >
        <Link
          style={{ maxHeight: "50px", fontWeight: "bold",cursor:"pointer" }}
          className="taskItemSize titleLink" to="/dashboard/tasks"
        >
          {props.data.task.title}
        </Link>
        <div
          style={{ maxHeight: "100px", color: "#767676", lineHeight: "normal" }}
          className="taskItemSize"
        >
          {props.data.task.description}
        </div>
        <div
          style={{
            maxHeight: "30px",
            color: "#767676",
            fontSize: "11px",
            lineHeight: "normal",
          }}
          className="taskItemSize"
        >
          {props.data.assignor.name + " "}on {created} To {props.data.assignee.name}
        </div>
      </div>
      <div style={{ width: "15%" }}>
        <div className="dropdown">
          {color === "red" ? (
            <p style={{ color: color, fontStyle:"italic" }}>overdue</p>
          ) : (
            <p style={{ color: color, fontStyle:"italic"  }}>{props.data.task.status.toLowerCase()}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default dailyTaskItem;
