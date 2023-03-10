import React, { useState } from 'react';

interface Task {
  text: string;
  checked: boolean;
}

function Note() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  function handleTaskChange(index: number, checked: boolean) {
    const newTasks = [...tasks];
    newTasks[index].checked = checked;
    setTasks(newTasks);
  }

  function handleTaskAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTask: Task = {
      text: '',
      checked: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleTaskTextChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newTasks = [...tasks];
    newTasks[index].text = event.target.value;
    setTasks(newTasks);
  }

  function toggleCheckboxes() {
    setShowCheckboxes(!showCheckboxes);
  }

  return (
    <div>
      <h2>My Note</h2>
      <button onClick={toggleCheckboxes}>
        {showCheckboxes ? 'Hide Checkboxes' : 'Show Checkboxes'}
      </button>
      <form onSubmit={handleTaskAdd}>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {showCheckboxes ? (
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={(event) =>
                    handleTaskChange(index, event.target.checked)
                  }
                />
              ) : null}
              <input
                type="text"
                value={task.text}
                onChange={(event) => handleTaskTextChange(index, event)}
              />
            </li>
          ))}
        </ul>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Note;
