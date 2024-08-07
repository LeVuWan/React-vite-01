import "./todo.css";

const TodoData = (props) => {
  const { data } = props;

  console.log("Check props: ", props);
  return <div className="todo_data">My name is {data.name}</div>;
};

export default TodoData;
