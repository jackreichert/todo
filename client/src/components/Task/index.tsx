import { useContext, useState } from "react";
import { TaskType } from "../../types.ts";
import AppContext from "../../context.ts";
import { updateTaskStatus, deleteTask } from "../../apiUtils.ts";

export default function Task({ id, title, status }: TaskType) {
  const { tasks, setTasks } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      if (!id) throw new Error("No id");
      setIsLoading(true);
      await deleteTask(id);
      const newTasks: TaskType[] = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChange() {
    try {
      if (!id) throw new Error("No id");
      setIsLoading(true);
      const updatedTask = await updateTaskStatus(id, !status);
      const newTasks: TaskType[] = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <li className="list-none my-4 flex space-x-9">
      <div className="flex-1 text-left">{title}</div>
      <div className="w-10">
        {isLoading ? (
          <Spinner /> // CSS spinner
        ) : (
          <input
            type="checkbox"
            checked={status}
            onChange={handleChange}
            disabled={isLoading}
          />
        )}
      </div>
      <div className="w-15">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

const Spinner = () => {
  return (
    <div className="h-4 w-4 ml-3">
      <svg
        className="animate-spin h-full w-full text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.309-2.691 6-6 6-1.902 0-3.593-.879-4.709-2.249L6 14.291z"
        />
      </svg>
    </div>
  );
};