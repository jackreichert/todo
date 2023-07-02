import { useState, useEffect, useMemo } from 'react';
import './App.scss';

import { TaskType } from './types.ts';
import AppContext from './context.ts';
import App from './components/App.tsx';
import { fetchTasks } from './apiUtils.ts';

function AppProvider() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(() => ({ tasks, setTasks, loadingTasks }), [tasks, setTasks, loadingTasks]);

  return (
    <div className="container mx-auto">
      <AppContext.Provider value={contextValue}>
        <App />
      </AppContext.Provider>
    </div>
  );
}

export default AppProvider;
