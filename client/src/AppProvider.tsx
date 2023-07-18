import React, { useState, useMemo } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import './App.scss';

import { TaskType } from './types.ts';
import AppContext from './context.ts';
import App from './components/App.tsx';

function AppProvider() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

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
