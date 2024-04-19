import { useContext, useState } from 'react';
import { TaskType } from '../../types';
import AppContext from '../../context';
import TaskInput from '../TaskInput';

export default function Task({ title, status }: TaskType) {
  const { tasks, setTasks } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  function handleStatusChange() {
    const newTasks: TaskType[] = tasks.map((task) => (title === task.title ? {
      title: task.title,
      status: !task.status,
    } : task));
    setTasks(newTasks);
  }

  function handleDelete() {
    const newTasks: TaskType[] = tasks.filter((task) => title !== task.title);
    setTasks(newTasks);
  }

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  function handleCancel() {
    setIsEdit(!isEdit);
  }

  if (isEdit) {
    return (
      <li className="list-none my-4 flex justify-between">
        <TaskInput title={title} isEdit />
        <button type="button" onClick={handleCancel}>Cancel</button>
      </li>
    );
  }
  return (
    <li className="list-none my-4 flex justify-between">
      <span data-testid="task-title">{title}</span>
      <input type="checkbox" checked={status} onChange={handleStatusChange} />
      <button type="button" className="ml-2 p-4 border-solid border-2 border-slate-300" onClick={handleEdit}>Edit</button>
      <button type="button" className="ml-2 p-4 border-solid border-2 border-slate-300" onClick={handleDelete}>Delete</button>
    </li>
  );
}
