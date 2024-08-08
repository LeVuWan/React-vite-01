import "./components/todos/todo.css";
import TodoData from "./components/todos/TodoData";
import TodoInput from "./components/todos/TodoInput";
import DemeLogo from "./assets/react.svg";
import { useState } from "react";
const App = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "learning react" },
    // { id: 2, name: "watching youtube" },
  ]);

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

  return (
    <div className="todo_app">
      <div className="todo_list">Todo List</div>
      <TodoInput todoList={todoList} addNewTodo={addNewTodo}></TodoInput>
      <TodoData todoList={todoList} />
      <div className="todo_img">
        <img src={DemeLogo} alt="" />
      </div>
    </div>
  );
};

export default App;
