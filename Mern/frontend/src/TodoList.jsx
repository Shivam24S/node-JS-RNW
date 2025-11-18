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
          {todoData.map((t) => (
            <tr key={t.id}>
              <td>{t.task}</td>
              <td>{t.description}</td>
              <td>
                <button onClick={() => editTodo(t.id)}>edit</button>
              </td>
              <td>
                <button onClick={() => deleteTodo(t.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
