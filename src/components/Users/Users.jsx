import React, { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "../features/listItem";
import AdminListItem from "../features/AdminListItem";
import Pagination from "../features/Pagination";
import ConfirmModal from "../features/ConfirmModal";
import { retrieveCookie } from "../helpers/helpers";
import UserProfile from "./UserProfile";
import { Route, Switch, useRouteMatch } from "react-router";
function Users(props) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ search: "", page: 1, showDel: "" });
  const [pageProps, setPageProps] = useState({
    current: 0,
    per_page: 8,
    last: 0,
  });
  const [confirm, setConfirm] = useState({ message: "", type: "", id: "" });
  const { path } = useRouteMatch();
  function modalType(obj) {
    setConfirm({ message: obj.message, type: obj.type, id: obj.id });
  }
  function pageChange(page) {
    let obj = { ...filters, page: page };
    setFilters(obj);
  }
  function reloadList(){
    setFilters({...filters});
  }
  function handleConfirmFalse() {
    setConfirm({ message: "", type: "", id: "" });
  }
  function handleConfirmTrue(type, id) {
    const token = retrieveCookie();
    if (type === "Delete") {
      axios
        .post(
          "http://localhost:8000/users/delete",
          { id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res && res.status === 200) {
            console.log(res.data.message);
            let obj = { ...filters, page: 1 };
            setFilters(obj);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "Restore") {
      axios
        .post(
          "http://localhost:8000/users/restore",
          { id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res && res.status === 200) {
            console.log(res.data.message);
            let obj = { ...filters, page: 1 };
            setFilters(obj);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setConfirm({ message: "", type: "", id: "" });
  }
  function handleCheckbox(e) {
    let obj = {};
    if (e.target.checked === false) {
      obj = { ...filters, page: 1, showDel: "" };
    } else {
      obj = { ...filters, page: 1, showDel: "1" };
    }
    setFilters(obj);
  }
  useEffect(() => {
    let filters = localStorage.getItem("Filters");
    if (filters) {
      filters = JSON.parse(filters);
      setFilters(filters);
    }
  }, []);
  useEffect(() => {
    const token = retrieveCookie();
    let searchQuery = "";
    if (filters.search.length > 0) {
      searchQuery = "&search=" + filters.search;
    }
    let delQuery = "";
    if (filters.showDel.length > 0) {
      delQuery = "&deleted=1";
    }
    axios
      .get(
        "http://localhost:8000/users/list?page=" +
          filters.page +
          searchQuery +
          delQuery,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res && res.status === 200) {
          setData(res.data.results.data);
          setTotal(res.data.results.total);
          setPageProps({
            current: res.data.results.current_page,
            per_page: res.data.results.per_page,
            last: res.data.results.last_page,
          });
        } else if (res && res.status === 204) {
          setData([]);
          setTotal(0);
          setPageProps({ current: 0, per_page: 8, last: 0 });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        localStorage.setItem("Filters", JSON.stringify(filters));
      });
  }, [filters]);
  var listItems;
  if (data.length !== 0) {
    if (props.user.admin_access === 1) {
      listItems = data.map((res) => {
        return (
          <AdminListItem
            key={res.id}
            user={res}
            display={modalType}
          />
        );
      });
    } else {
      listItems = data.map((res) => {
        return <ListItem key={res.id} user={res} />;
      });
    }
  }
  return (
    <div style={{ width: "84%" }}>
      <Switch>
        <Route exact path={path}>
          <p className="mt-2 ml-3">User Management</p>
          <ConfirmModal
            data={confirm}
            handleTrue={handleConfirmTrue}
            handleFalse={handleConfirmFalse}
          />
          <div className="ml-3 mr-4 card border-0" style={{ height: "94%" }}>
            <div className="container">
              <div className="d-flex justify-content-between mt-4 mb-3">
                <input
                  placeholder="Search by name or email..."
                  className="form-control searchBox"
                  defaultValue={filters.search}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      if (e.target.value !== filters.search) {
                        let obj = {
                          ...filters,
                          search: e.target.value,
                          page: 1,
                        };
                        setFilters(obj);
                      }
                    }
                  }}
                />
                {props.user.admin_access === 1 ? (
                  <div className="form-check d-flex align-items-center justify-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="on"
                      onClick={(e) => {
                        handleCheckbox(e);
                      }}
                      id="flexCheckDefault"
                      defaultChecked={filters.showDel ? "true" : ""}
                    />
                    <label
                      className="form-check-label pt-1"
                      htmlFor="flexCheckDefault"
                      style={{
                        color: "#9e9e9e",
                        fontWeight: "normal",
                        fontSize: "14px",
                      }}
                    >
                      Show Deleted Users
                    </label>
                  </div>
                ) : null}

                <p
                  style={{ color: "#9e9e9e" }}
                  className="mx-4 align-self-center justify-item-center m-0"
                >
                  Total:
                  <span style={{ color: "#767676", fontWeight: "bold" }}>
                    {total}
                  </span>
                </p>
              </div>
              <hr style={{ border: "#f7f7f7 0.5px solid" }} />
              <div className="container">
                <ul className="list-group">{listItems}</ul>
              </div>
              <div className="mt-3 pagination-pos">
                <Pagination page={pageProps} change={pageChange} />
              </div>
            </div>
          </div>
        </Route>
        <Route path={`${path}/:userId`}>
          <UserProfile load={reloadList}/>
        </Route>
      </Switch>
    </div>
  );
}

export default Users;
