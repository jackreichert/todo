import React, { useContext, useState } from 'react';
import InputError from '../InputError/index.tsx';
import AppContext from '../../context.ts';
import { addTask } from '../../apiUtils.ts';

export default function TaskInput() {
  const [taskInput, setTaskInput] = useState<string>('');
  const { tasks, setTasks } = useContext(AppContext);
  const [wasChanged, setWasChanged] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  async function updateTaskList() {
    try {
      setIsAddingTask(true);
      const newTask = await addTask(taskInput, false);
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      setTaskInput('');
      setWasChanged(false);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsAddingTask(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWasChanged(true);
    setTaskInput(event.target.value);
  }

  function isValid(): boolean {
    return taskInput.length >= 3;
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
      />
      <button
        type="button"
        data-testid="task-submit"
        className="ml-2 p-4 border-solid border-2 border-slate-300"
        onClick={handleClick}
        disabled={!isValid() || isAddingTask}
      >
        {isAddingTask ? 'Adding...' : 'Click to add'}
      </button>
      <InputError isError={!isValid() && wasChanged} />
    </div>
  );
}
