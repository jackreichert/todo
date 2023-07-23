import { useContext, useState } from 'react';
import { TaskType } from '../../types';
import AppContext from '../../context';

export default function Task({ title, status }: TaskType) {
  const { tasks, setTasks } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

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

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function handleEdit() {
    setIsEdit(!isEdit);
    setNewTitle(title);
  }

  function handleSave() {
    const newTasks: TaskType[] = tasks.map((task) => (title === task.title ? {
      title: newTitle,
      status: task.status,
    } : task));
    setTasks(newTasks);
    setIsEdit(!isEdit);
  }

  function handleCancel() {
    setIsEdit(!isEdit);
  }

  if (isEdit) {
    return (
      <li className="list-none my-4 flex justify-between">
        <input type="text" onChange={handleTitleChange} value={newTitle} />
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </li>
    );
  }
  return (
    <li className="list-none my-4 flex justify-between">
      <span data-testid="task-title">{title}</span>
      <input type="checkbox" checked={status} onChange={handleStatusChange} />
      <button type="button" onClick={handleEdit}>Edit</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </li>
  );
}
