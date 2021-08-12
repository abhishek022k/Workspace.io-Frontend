import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { getFirstLetters } from "../helpers/helpers";

function AdminListItem(props) {
  let { path } = useRouteMatch();

  return (
    <li className="list-group-item d-flex justify-content-between p-2 border-0">
      <div className="d-flex align-items-center">
        <div className="user-list-logo mr-3">{getFirstLetters(props.user.name)}</div>
        <div>
          <Link style={{ fontWeight: "bold" }} to={`${path}/${props.user.id}`}>
            {props.user.name}
          </Link>
          <div>{props.user.email}</div>
        </div>
      </div>
      <div className="d-flex align-self-center">
        {!props.user.deleted_at || props.user.deleted_at === null ? (
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-outline-warning"
            onClick={() => {
              let obj = {
                message:
                  "Are you sure you want to delete user with email " +
                  props.user.email +
                  " ?",
                id: props.user.id,
                type: "Delete",
              };
              props.display(obj);
            }}
          >
            DELETE
          </button>
        ) : (
          <button type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-success"
          onClick={() => {
            let obj = {
              message:
                "Are you sure you want to restore user with email " +
                props.user.email +
                " ?",
              id: props.user.id,
              type: "Restore",
            };
            props.display(obj);
          }}>
            RESTORE
          </button>
        )}
      </div>
    </li>
  );
}

export default AdminListItem;
