import { useState } from "react";
import InputForm from "./component/InputForm";

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

  const addTodo = (input) => {
    const newData = {
      id: new Date().getTime(),
      task: input.task,
      description: input.description,
    };

    setTodoData((prev) => [...prev, newData]);
  };

  console.log("todo-data", todoData);

  return (
    <>
      <InputForm addTodo={addTodo} />
    </>
  );
};

export default App;
