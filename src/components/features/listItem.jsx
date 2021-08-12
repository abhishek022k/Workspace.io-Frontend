import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { getFirstLetters } from "../helpers/helpers";

function ListItem(props) {
  let { path } = useRouteMatch();

  return (
    <li className="list-group-item d-flex justify-content-between p-2 border-0">
      <div className="d-flex align-items-center">
        <div className="user-list-logo mr-3">
          {getFirstLetters(props.user.name)}
        </div>
        <div>
          <Link style={{ fontWeight: "bold" }} to={`${path}/${props.user.id}`}>
            {props.user.name}
          </Link>
          <div>{props.user.email}</div>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
