import "./components/todos/todo.css";
import TodoData from "./components/todos/TodoData";
import TodoInput from "./components/todos/TodoInput";
import DemeLogo from "./assets/react.svg";
import { useState } from "react";
const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "learning react" },
    { id: 2, name: "watching youtube" },
  ]);

  const data = {
    name: "Vux",
    address: "Da Nang",
    country: "Viet Nam",
  };

  const addNewTodo = (name) => {
    alert(`Call me ${name}`);
  };

  return (
    <div className="todo_app">
      <div className="todo_list">Todo List</div>
      <TodoInput todoList={todoList}></TodoInput>
      <TodoData todoList={todoList} />
      <div className="todo_img">
        <img src={DemeLogo} alt="" />
      </div>
    </div>
  );
};

export default App;
