const TodoList = ({ todoData, editTodo, deleteTodo }) => {
  return (
    <>
      <table border="2px solid black">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {todoData.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.task}</td>
                <td>{todo.description}</td>
                <td>
                  <button onClick={() => editTodo(todo.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
