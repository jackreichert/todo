import { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '@/context';
import Task from '@/components/Task/index';

export default function List() {
  const { tasks, setTasks } = useContext(AppContext);

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, [setTasks]);

  return (
    <ul data-testid="task-list" className="mt-10 w-full mx-auto">
      {tasks.map((task) => (
        <Task key={uuidv4()} title={task.title} status={task.status} />
      ))}
    </ul>
  );
}
