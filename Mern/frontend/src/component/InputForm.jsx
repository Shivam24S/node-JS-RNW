import React, { useState } from "react";

const InputForm = ({ addTodo }) => {
  const [input, setInput] = useState({
    task: "",
    description: "",
  });

  const handleChange = (identifier, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [identifier]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput({ task: "", description: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="task"
          value={input.task}
          onChange={(e) => handleChange("task", e)}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          placeholder="description"
          value={input.description}
          onChange={(e) => handleChange("description", e)}
        />
        <br />
        <br />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default InputForm;
