import { useState, useEffect, FC } from "react";
import "./App.css";

const App: FC = () => {
  const [value, setValue] = useState<string>("");
  const [day, setDay] = useState<number>(1);
  const [todos, setTodo] = useState<Array<{ value: string; day: number }>>([]);

  function deleteTasks() {
    setTodo([]);
    localStorage.removeItem("tasks");
  }

  useEffect(() => {
    if (localStorage.getItem("tasks") !== null) {
      const tasksValue = JSON.parse(localStorage.getItem("tasks") as string);

      setTodo(tasksValue);
    }
  }, []);

  return (
    <div className="App">
      <div className="todo-list">
        <div className="title-content">
          <h1>To-do list</h1>
          <p>Faça sua lista de afazeres aqui!</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setTodo([...todos, { value, day }]);

            localStorage.setItem(
              "tasks",
              JSON.stringify([...todos, { value, day }])
            );
          }}
        >
          <input
            className="task"
            type="text"
            placeholder="Task..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />

          <input
            className="days"
            type="number"
            placeholder="Deadline (in Days)..."
            value={day}
            onChange={(event) => setDay(Number(event.target.value))}
          />
          <div className="button-container">
            <button className="btn add" type="submit" value="Add Tasks">
              Add Task
            </button>
          </div>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.value} - {todo.day} day(s)
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button
            className="btn delete"
            type="button"
            value="Delete Tasks"
            onClick={(event) => {
              deleteTasks();
            }}
          >
            Delete tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
