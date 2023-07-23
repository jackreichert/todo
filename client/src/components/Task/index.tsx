import { useContext } from 'react';
import { TaskType } from '../../types';
import AppContext from '../../context';

export default function Task({ title, status }: TaskType) {
  const { tasks, setTasks } = useContext(AppContext);

  function handleChange() {
    const newTasks: TaskType[] = tasks.map((task) => (title === task.title ? {
      title: task.title,
      status: !task.status,
    } : task));
    setTasks(newTasks);
  }

  function handleDelete(e:React.MouseEvent<HTMLButtonElement>) {
    let liTitle = (e.target as HTMLElement).parentNode?.textContent || '';
    liTitle = liTitle.slice(0, -10);
    const newTasks: TaskType[] = tasks.filter((task) => liTitle !== task.title);
    setTasks(newTasks);
  }

  return (
    <li className="list-none my-4 flex justify-between">
      {title}
      <input type="checkbox" checked={status} onChange={handleChange} />
      <button type="button">Edit</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </li>
  );
}
