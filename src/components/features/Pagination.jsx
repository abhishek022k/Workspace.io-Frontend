import React from "react";

function Pagination(props) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link border-0"
            aria-label="First"
            disabled={(props.page.current === 1 || props.page.current === 0) ? true : ""}
            onClick={() => {
              props.change(1);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link border-0"
            aria-label="Previous"
            disabled={(props.page.current === 1 || props.page.current === 0)? true : ""}
            onClick={() => {
              props.change(props.page.current - 1);
            }}
          >
            &lt;
          </button>
        </li>
        <li className="page-item d-flex">
          <div className="pagination-text">
            {props.page.current} of {props.page.last}
          </div>
        </li>
        <li className="page-item">
          <button
            className="page-link border-0"
            aria-label="Next"
            disabled={(props.page.current === props.page.last || props.page.current === 0) ? true : ""}
            onClick={() => {
              props.change(props.page.current + 1);
            }}
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link border-0"
            aria-label="Last"
            disabled={(props.page.current === props.page.last || props.page.current === 0) ? true : ""}
            onClick={() => {
              props.change(props.page.last);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
