import "./todo.css";

const TodoInput = (props) => {
  console.log("Check props: " + props.addNewTodo);
  const { addNewTodo } = props;
  const handleClick = () => {
    alert("Click me");
  };
  const handleOnChange = (name) => {
    console.log("handleOnChange: ", name);
  };
  // addNewTodo("Vux");
  return (
    <div className="input">
      <input
        type="text"
        onChange={(event) => handleOnChange(event.target.value)}
      />
      <button style={{ cursor: "pointer" }} onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
