import "./todo.css";

const TodoData = (props) => {
  const { data } = props;

  console.log("Check props: ", props);
  return <div className="todo_data">{JSON.stringify(props.todoList)}</div>;
};

export default TodoData;
