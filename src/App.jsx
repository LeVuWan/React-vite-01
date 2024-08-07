import "./components/todos/todo.css";
import TodoData from "./components/todos/TodoData";
import TodoInput from "./components/todos/TodoInput";
import DemeLogo from "./assets/react.svg";
const App = () => {
  return (
    <div className="todo_app">
      <div className="todo_list">Todo List</div>
      <TodoInput></TodoInput>
      <TodoData></TodoData>
      <div className="todo_img">
        <img src={DemeLogo} alt="" />
      </div>
    </div>
  );
};

export default App;
