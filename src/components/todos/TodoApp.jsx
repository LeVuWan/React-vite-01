import TodoData from "./TodoData";
import TodoInput from "./TodoInput";
import "./todo.css";
import reactLogo from "../../assets/react.svg";
import { useState } from "react";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(0, 1000),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };

  const deleteTodo = (id) => {
    const updateTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(updateTodo);
  };

  return (
    <div className="todo_app">
      <div className="todo_list">Todo List</div>
      <TodoInput addNewTodo={addNewTodo} />
      {todoList.length === 0 ? (
        <div className="todo-img">
          <img src={reactLogo} alt="" className="logo" />
        </div>
      ) : (
        <TodoData todoList={todoList} deleteTodo={deleteTodo} />
      )}
    </div>
  );
};

export default TodoApp;
