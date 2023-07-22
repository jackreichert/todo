import { useState, useMemo } from 'react';

import '../src/App.scss';
import { TaskType } from '../src/types';
import AppContext from '../src/context';
import App from '../src/components/App';

const initialState:TaskType[] = [
  { title: 'Go to the store', status: false },
  { title: 'Buy some cheese', status: false },
  { title: 'Buy a Vision Pro', status: true },
  { title: 'Learn to fly', status: false },
];

function MockProvider() {
  const [tasks, setTasks] = useState<TaskType[]>(initialState);
  const contextValues = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  return (
    <div className="container mx-auto">
      <AppContext.Provider value={contextValues}>
        <App />
      </AppContext.Provider>
    </div>
  );
}

export default MockProvider;
