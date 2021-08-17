import React from "react";
import { getFormattedDate, getFormattedTime } from "../helpers/helpers";

function TaskItem(props) {
  const due_date = getFormattedDate(props.data.task.due_date);
  const created = getFormattedDate(props.data.task.created_at);
  const due_time = getFormattedTime(props.data.task.due_date);
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
        className="d-flex flex-column justify-content-between"
      >
        <div
          style={{ maxHeight: "50px", fontWeight: "bold" }}
          className="taskItemSize"
        >
          {props.data.task.title}
        </div>
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
          {props.data.assignor.name + " "}on {created}
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
          To {props.data.assignee.name}
        </div>
      </div>
      <div style={{ width: "15%" }}>
        <div className="dropdown" >
          <button
            className="btn dropdown-toggle caret-off"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{backgroundColor:"#FFFFFF",width:"32px",fontSize:"large"}}
          >
            &#10247;
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" >
              Edit
            </button>
            <button className="dropdown-item">
              Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
