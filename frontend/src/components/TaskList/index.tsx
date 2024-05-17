import { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '@/context';
import Task from '@/components/Task/';
import { fetchLists, fetchTasks } from '@/utils/';

export default function List() {
  const {
    tasks, setTasks, setLists, defaultList, setDefaultList,
  } = useContext(AppContext);

  useEffect(() => {
    const listsData = fetchLists();
    listsData.then((res) => {
      setLists(res);
      setDefaultList(res[0].id);
    });
    if (defaultList === '') {
      return;
    }
    const tasksData = fetchTasks(defaultList);
    tasksData.then((res) => setTasks(res));
  }, [setLists, setDefaultList, defaultList, setTasks, tasks]);

  return (
    <ul data-testid="task-list" className="mt-10 w-full mx-auto">
      {Array.isArray(tasks) && tasks.map((task) => (
        <Task key={uuidv4()} title={task.title} completed={task.completed} />
      ))}
    </ul>
  );
}
