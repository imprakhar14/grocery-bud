import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    setList([]);
    setName("");
    showAlert(true, "success", "list has been cleared");
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "success", "item removed");
  };
  const editItem = (id) => {
    const itemToDelete = list.find((item) => item.id === id);
    setName(itemToDelete.title);
    setIsEdit(true);
    setEditID(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter some items");
    } else if (name && isEdit) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEdit(false);
      showAlert(true, "success", "item updated");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg: eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEdit ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            list={list}
            clearList={clearList}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
