import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./TodoList.scss";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState({
    name: "",
  });
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  //lấy dữ liệu từ sv về
  const handleGetTodo = async () => {
    try {
      const response = await axios.get("http://localhost:6886/api/v1/todo?per_page=4");
      setTodoList(response.data);
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetTodo();
  }, [flag]);
  //thêm dữ liệu lên sv
  const handleAddTodo = async () => {
    try {
      const response = await axios.post("http://localhost:6886/api/v1/todo", {
        ...newTodo,
        id: Math.floor(Math.random() * 9999999999),
        complete: false
      });
      setNewTodo({
        name: "",
      });
      setFlag(!flag)
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  //sửa sp
  const handleEdit = async (item) => {
    setNewTodo(item);
    setIsEdit(true);
  };
  //lưu vào sau khi đã sửa
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:6886/api/v1/todo/${newTodo.id}`,
        newTodo
      );
      // setTodoList(response.data);
      setNewTodo({
        name: "",
      });
      setFlag(!flag)
    } catch (error) {
      alert(error.response.data.message);
    }
    setIsEdit(false);
  };
  //xóa
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:6886/api/v1/todo/${id}`
      );
      // setTodoList(response.data);
      setFlag(!flag)

    } catch (error) {
      console.log(error);
    }
  };
  //xóa hết
  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(`http://localhost:6886/api/v1/todo`);
      // setTodoList(response.data);
      setFlag(!flag)

    } catch (error) {
      console.log(error);
    }
  };
  //xử lý complete
  const handleChangeComplete = async (item) => {
    const response = await axios.patch(`http://localhost:6886/api/v1/todo/${item.id}`, item)
    // setTodoList(response.data);
    setFlag(!flag)

  }
  const renderComplete = todoList.filter((item) => item.complete == false);

  return (
    <>
      <div style={{ backgroundColor: "rgb(198, 192, 192)", width: "1263px", height: "1000px" }}> <br /> <br /><br /><br />
        <div className='container'>
          <div>
            <h2>Todo App</h2>
          </div>
          <div style={{ marginTop: "20px" }}>
            <input type="text"
              placeholder='Nhập thông tin vào đây!'
              name='name'
              onChange={(e) =>
                setNewTodo({ ...newTodo, [e.target.name]: e.target.value })
              }
              value={newTodo.name}
            />

            {isEdit ? <button onClick={handleSave}>Edit</button> : <button onClick={handleAddTodo}
              style={{ width: "50px", height: "28px", marginLeft: "5px", backgroundColor: "gray", border: "none" }}>
              <FaPlus style={{ color: "white" }} />
            </button>}

          </div>
          <div>
            {todoList.map((item, index) => {
              return <div className='div_all' style={{ display: "flex" }} key={index}>
                <div className='item_name' style={{ marginBottom: "10px", width: "302px", marginTop: "5px", textDecoration: item.complete ? "line-through" : "none" }}
                  onClick={() => handleChangeComplete(item)}>{item.name}
                  {/* <button onClick={() => handleEdit(item)}>Sửa</button> */}
                </div>
                <div className='handleDelete'>
                  <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: "red", border: "none", width: "50px", height: "28px" }}>
                    <MdDeleteForever style={{ color: "white", width: "20px", height: "20px" }} />
                  </button>
                </div>

              </div>
            })}
          </div>
          <div>
            <div style={{ display: "flex", marginTop: "20px", marginLeft: "120px" }}>
              <div>Bạn đang có {renderComplete.length} todoList</div>
              <button onClick={handleDeleteAll} style={{ width: "50px", height: "20px", backgroundColor: "gray", border: "none", color: "white", marginLeft: "32px" }}>Xóa hết</button>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
