import "./todo.css";

const TodoData = (props) => {
  const { todoList } = props;

  console.log("Check props: ", props);
  return (
    <div>
      {todoList.map((item, index) => {
        return (
          <div className={`todo_item`} key={item.id || index}>
            <div> {item.name}</div>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
