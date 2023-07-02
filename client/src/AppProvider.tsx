import { useState, useEffect, useMemo } from 'react';
import './App.scss';

import { TaskType } from './types.ts';
import AppContext from './context.ts';
import App from './components/App.tsx';
import { fetchTasks } from './apiUtils.ts';
function AppProvider() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    fetchData();
  }, []);

  const contextValue = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  return (
    <div className="container mx-auto">
      <AppContext.Provider value={contextValue}>
        <App />
      </AppContext.Provider>
    </div>
  );
}

export default AppProvider;
