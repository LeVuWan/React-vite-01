import "./todo.css";

const TodoInput = (props) => {
  console.log("Check props: " + props.addNewTodo);
  const { addNewTodo } = props;
  // addNewTodo("Vux");
  return (
    <div className="input">
      <input type="text" />
      <button>Add</button>
    </div>
  );
};

export default TodoInput;
