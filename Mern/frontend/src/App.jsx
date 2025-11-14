import { useState } from "react";
import InputForm from "./component/InputForm";
import TodoList from "./TodoList";
import axios from "axios";

const App = () => {
  const initialState = [
    {
      id: 1,
      task: "learn",
      description: "learn react",
    },
    {
      id: 2,
      task: "practice",
      description: "practice react in detail",
    },
  ];

  const [todoData, setTodoData] = useState(initialState);

  const [editVal, setEditVal] = useState(null);

  const addTodo = async (input) => {
    if (!input.task || !input.description) {
      return alert("please provide task and description data");
    } else if (editVal) {
      setTodoData((prevData) =>
        prevData.map((t) =>
          t.id === editVal.id
            ? { ...t, task: input.task, description: input.description }
            : t
        )
      );
      setEditVal(null);
    } else {
      const newData = {
        id: new Date().getTime(),
        task: input.task,
        description: input.description,
      };

      setTodoData((prev) => [...prev, newData]);

      try {
        const res = await axios.post("http://localhost:5000/add", newData);

        if (res.status === 201) {
          alert("data added successfully");
        } else {
          throw new Error("Failed to create data");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const editTodo = (id) => {
    const editValue = todoData.find((t) => t.id === id);

    setEditVal(editValue);
  };

  const deleteTodo = (id) => {
    const deleteVal = todoData.filter((t) => t.id !== id);

    setTodoData(deleteVal);
  };

  return (
    <>
      <InputForm addTodo={addTodo} editVal={editVal} />
      <br />
      <br />
      <TodoList
        todoData={todoData}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
};

export default App;
