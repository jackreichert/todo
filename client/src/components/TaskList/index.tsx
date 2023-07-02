import { useContext } from "react";
import AppContext from "../../context.ts";
import Task from "../Task/index.tsx";

export default function List() {
  const { tasks, loadingTasks } = useContext(AppContext);

  return (
    <ul data-testid="task-list" className="mt-10 w-1/4 mx-auto">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
        />
      ))}
      {loadingTasks && Array.from({ length: 5 }).map((_, index) => <PlaceholderTask key={index} />)}
    </ul>
  );
}

function PlaceholderTask() {
  return (
    <li className="list-none my-4 flex space-x-4">
      <div className="flex-1 animate-pulse bg-gray-200 h-6 w-100"></div>
      <div className="w-10 animate-pulse bg-gray-200 h-6 rounded"></div>
    </li>
  );
}
