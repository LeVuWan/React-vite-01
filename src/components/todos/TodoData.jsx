import "./todo.css";

const TodoData = (props) => {
  const { todoList, deleteTodo } = props;

  const onClickDelete = (id) => {
    alert(id);
    deleteTodo(id);
  };

  return (
    <div>
      {todoList.map((item, index) => {
        return (
          <div className={`todo_item`} key={item.id || index}>
            <div> {item.name}</div>
            <button onClick={() => onClickDelete(item.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
