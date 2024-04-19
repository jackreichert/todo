import { useState, useMemo, useEffect } from 'react';
import './App.scss';

import { TaskType } from './types';
import AppContext from './context';
import App from './components/App';
import { getTasks } from './utils';

function AppProvider() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const contextValue = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  useEffect(() => {
    getTasks(setTasks);
  }, [setTasks]);

  return (
    <div className="container mx-auto">
      <AppContext.Provider value={contextValue}>
        <App />
      </AppContext.Provider>
    </div>
  );
}

export default AppProvider;
