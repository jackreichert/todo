import { useContext, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import { TaskType } from '@/types';
import AppContext from '@/context';
import TaskInput from '@/components/TaskInput';

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
      <li className="list-none my-4 flex justify-between items-center p-4">
        <TaskInput title={title} isEdit />
        <button
          type="button"
          onClick={handleCancel}
          className="ml-auto text-gray-500"
          aria-label="Cancel Edit"
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="list-none my-4 flex justify-start items-center p-4">
      <input
        id={`task-${title}`}
        type="checkbox"
        checked={status}
        onChange={handleStatusChange}
        className="mr-4 h-6 w-6 text-blue-800 rounded"
        aria-label={`Mark ${title} as complete`}
      />
      <label
        htmlFor={`task-${title}`}
        data-testid="task-title"
        className="text-lg font-semibold"
      >
        {title}
      </label>
      <button type="button" className="ml-auto text-gray-500" onClick={handleEdit} aria-label={`Edit ${title}`}>
        <FiEdit2 />
      </button>
      <button type="button" className="ml-2 text-gray-500" onClick={handleDelete} aria-label={`Delete ${title}`}>
        <FiTrash2 />
      </button>
    </li>
  );
}
