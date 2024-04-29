import { useState, useMemo } from 'react';
import './App.scss';

import { TaskType } from './types';
import AppContext from './context';
import App from './components/App';

function AppProvider() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const contextValue = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  return (
    <div data-testid="root" className="container mx-auto">
      <AppContext.Provider value={contextValue}>
        <App data-testid="app-element" />
      </AppContext.Provider>
    </div>
  );
}

export default AppProvider;
