import React from 'react';

function TaskArchives(props) {
    return (
        <div style={{ height: "93.15%" }}>
      <div className="mx-3 card border-0 h-100 p-3">
        <div className="tasklist-container-grid">
          <div className="tasklist-item1">
            <div className="d-flex justify-content-between mt-2 mb-3">
              <input
                placeholder="Search by title or description..."
                className="form-control searchBox"
                // defaultValue={filters.search}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    // if (e.target.value !== filters.search) {
                    //   let obj = {
                    //     ...filters,
                    //     search: e.target.value,
                    //   };
                    //   filterChange(obj);
                    // }
                  }
                }}
              />
              <div className="d-flex justify-content-center align-items-center">
                <p className="selectLabel">Assigner &nbsp;</p>
                {/* <CustomSelect options={options} change={assignerSelect} defaultVal={filters.assigner}/> */}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="selectLabel">Assignee &nbsp;</p>
                {/* <CustomSelect options={options} change={assigneeSelect} defaultVal={filters.assignee}/> */}
              </div>
              {/* <div className="d-flex justify-content-center align-items-center">
                <p className="selectLabel">Interval &nbsp;</p>
                <CustomSelect />
              </div> */}
            </div>
            <hr style={{ border: "#f7f7f7 0.5px solid" }} />
          </div>
          <div className="tasklist-item2">
            <div className="ml-4 task-header">TODO()</div>
            <div className="list-area"></div>
          </div>
          <div className="tasklist-item3">
            <div className="ml-4 task-header">
              IN PROGRESS()
            </div>
            <div className="list-area"></div>
          </div>
          <div className="tasklist-item4">
            <div className="ml-4 task-header">
              COMPLETED()
            </div>
            <div className="list-area"></div>
          </div>
          <div className="tasklist-item5">
            <div className="ml-4 task-header">OVERDUE()</div>
            <div className="list-area"></div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default TaskArchives;