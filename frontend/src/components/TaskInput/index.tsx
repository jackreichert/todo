import React, { useContext, useState } from 'react';

import InputError from '@/components/InputError/index';
import AppContext from '@/context';
import { TaskType, TaskInputProp } from '@/types';

export default function TaskInput({ title = '', isEdit = false }:TaskInputProp) {
  const [taskInput, setTaskInput] = useState<string>(title);
  const { tasks, setTasks } = useContext(AppContext);
  const [wasChanged, setWasChanged] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWasChanged(true);
    setTaskInput(event.target.value);
  }

  function isValid():boolean {
    return taskInput.length >= 3;
  }

  function updateTaskList() {
    const newTask: TaskType = { title: taskInput, status: false };
    if (isEdit) {
      const newTasks: TaskType[] = tasks.map((task) => (title === task.title ? newTask : task));
      setTasks(newTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTaskInput('');
    setWasChanged(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    setWasChanged(true);
    if (event.key === 'Enter' && isValid()) {
      updateTaskList();
    }
  }

  function handleClick() {
    if (isValid()) {
      updateTaskList();
    }
  }

  return (
    <div>
      <input
        data-testid="task-input"
        type="text"
        placeholder="add your next task to do"
        className="p-4 border-solid border-2 border-slate-300 rounded-lg"
        value={taskInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setWasChanged(false)}
        minLength={3}
        aria-label="Task Input"
      />
      <button
        type="button"
        data-testid="task-submit"
        className="ml-2 p-4 border-solid border-2 border-slate-300"
        onClick={handleClick}
        aria-label="Save Task"
      >
        Save
      </button>
      <InputError isError={!isValid() && wasChanged} />
    </div>
  );
}
