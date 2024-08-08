import { useState } from "react";
import "./todo.css";

const TodoInput = (props) => {
  const [valueInput, setValueInput] = useState("Quang Vu");

  // console.log("Check props: " + props.addNewTodo);
  const { addNewTodo } = props;

  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput("");
  };

  const handleOnChange = (name) => {
    setValueInput(name);
  };
  console.log("Check props: ", props);
  return (
    <div className="input">
      <input
        type="text"
        value={valueInput}
        onChange={(event) => handleOnChange(event.target.value)}
      />
      <button style={{ cursor: "pointer" }} onClick={handleClick}>
        Add
      </button>
      <div className="valueInput">My text input is {valueInput}</div>
    </div>
  );
};

export default TodoInput;
