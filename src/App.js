import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import Alert from "./Alert";
import { FaPlus, FaRedo } from "react-icons/fa";
import CheckedItemList from "./CheckedItemList";

// ============== List local storage =================================================
const getLocalStorageList = () => {
  // =================== list local storage =========
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

// ============== List local storage ===================================================
const getLocalStorageDoneList = () => {
  // =================== list local storage =========
  let doneList = localStorage.getItem("doneList");
  if (doneList) {
    return JSON.parse(localStorage.getItem("doneList"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorageList());
  const [doneList, setDoneList] = useState(getLocalStorageDoneList());
  // const [theme, setTheme] = useState(getStorageTheme());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  //===================================================================================

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    localStorage.setItem("doneList", JSON.stringify(doneList));
  }, [doneList]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "danger", "please enter values");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "item edited successfully");
    } else {
      showAlert(true, "success", "one item added to the list");
      const newlist = { title: name, id: new Date().getTime().toString() };
      setList([...list, newlist]);
      setName("");
    }
  };

  const handleClear = () => {
    setList([]);
  };
  const handleCheckedList = () => {
    setDoneList([]);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  // REMOVE SINGLE ITEM =======================================================================
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  // CHECKED ITEM ============================================================================
  const checkedItem = (id) => {
    // console.log("checkeditem called", id);
    const specificItem = list.find((item) => item.id === id);
    setList(list.filter((item) => item.id !== id));
    setDoneList([...doneList, specificItem]);
    showAlert(true, "success", "task is completed");
  };

  return (
    <div className="container">
      <section className="section-center">
        {alert.show && <Alert {...alert} />}
        <form onSubmit={handleSubmit} className="grocery-form">
          <div className="header-container">
            <h3>ToDoList</h3>
          </div>
          <div className="form-control">
            <button id="btn" type="submit" className="submit-btn">
              <FaPlus />
            </button>
            <input
              placeholder="Add a task"
              value={name}
              type="text"
              id="task"
              onChange={(e) => setName(e.target.value)}
              className="grocery"
            />
            <button onClick={handleClear} className="clear-btn">
              <FaRedo className="faredo" />
              <span>reset all todos</span>
            </button>
          </div>
        </form>
        {list.length > 0 ? (
          <div className="grocery-container">
            <TodoList
              items={list}
              editItem={editItem}
              removeItem={removeItem}
              checkedItem={checkedItem}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            List is empty
          </div>
        )}
      </section>

      <section className="section-center">
        <h3 className="header-container">Completed Task </h3>
        <button onClick={handleCheckedList} className="clear-btn">
          <FaRedo className="faredo" />
          <span>reset all todos</span>
        </button>
        {doneList.length > 0 ? (
          <div className="grocery-container">
            <CheckedItemList items={doneList} />
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            List is empty
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
