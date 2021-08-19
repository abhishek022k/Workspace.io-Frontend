import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { retrieveCookie, getFirstLetters } from "../helpers/helpers";
import { Link } from "react-router-dom";
import ConfirmModal from "../features/ConfirmModal";
import { useDispatch } from "react-redux";
import { fetchList } from "../../state/reducers/taskReducer";
import { fetchUserList } from "../../state/reducers/taskFilterReducer";

function UserProfile(props) {
  var { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState({ message: "", type: "", id: "" });
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = retrieveCookie();
    axios
      .get("http://localhost:8000/users/" + userId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res && res.status === 200) {
          setUser(res.data.user);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);
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
            props.load();
            dispatch(fetchList());
            dispatch(fetchUserList());
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
            props.load();
            dispatch(fetchList());
            dispatch(fetchUserList());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setReload(!reload);
    setConfirm({ message: "", type: "", id: "" });
  }
  return (
    <div style={{ height: "100%" }} className="ml-3">
        <ConfirmModal
            data={confirm}
            handleTrue={handleConfirmTrue}
            handleFalse={handleConfirmFalse}
          />
      {!loading ? (
        <div className="detail-container-grid">
          <p className="mt-2 detail-item1">
            <Link to=".">User Management</Link>
            {` / ${user.name}`}
          </p>
          <div className="p-2 detail-item2">
            <div className="user-detail-logo">{getFirstLetters(user.name)}</div>{
                props.admin === 1 ? (!user.deleted_at || user.deleted_at === null) ? (
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="btn btn-outline-warning detail-subitem-button"
                      onClick={() => {
                        let obj = {
                          message:
                            "Are you sure you want to delete user with email " +
                            user.email +
                            " ?",
                          id: user.id,
                          type: "Delete",
                        };
                        setConfirm(obj);
                      }}
                    >
                      DELETE
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="btn btn-outline-success detail-subitem-button"
                      onClick={() => {
                        let obj = {
                          message:
                            "Are you sure you want to restore user with email " +
                            user.email +
                            " ?",
                          id: user.id,
                          type: "Restore",
                        };
                        setConfirm(obj);
                      }}
                    >
                      RESTORE
                    </button>
                  ) : null
            }
            
            <div className="detail-subitem2 ml-4">
              <h4 style={{ fontWeight: "bold" }}>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserProfile;
