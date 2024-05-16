import { useState, useMemo } from 'react';

import '@/App.scss';
import { ListType, TaskType } from '@/types';
import AppContext from '@/context';
import App from '@/components/App';

function AppProvider() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [lists, setLists] = useState<ListType[]>([]);
  const [defaultList, setDefaultList] = useState<string>('');

  const contextValue = useMemo(() => ({
    tasks, setTasks, lists, setLists, defaultList, setDefaultList,
  }), [tasks, setTasks, lists, setLists, defaultList, setDefaultList]);

  return (
    <div data-testid="root" className="container mx-auto">
      <AppContext.Provider value={contextValue}>
        <App data-testid="app-element" />
      </AppContext.Provider>
    </div>
  );
}

export default AppProvider;
