import {
  useState, useMemo, useContext, useEffect,
} from 'react';

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

function MockTask() {
  const { tasks } = useContext(AppContext);
  const handleChange = () => {};

  return (
    <li>
      {tasks[0].title}
      {' '}
      <input type="checkbox" onChange={handleChange} checked={tasks[0].status} />
    </li>
  );
}

export function MockApp() {
  const singleTask: TaskType[] = [{ title: 'first task', status: true }];
  const [tasks, setTasks] = useState<TaskType[]>(singleTask);
  const contextValues = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  useEffect(() => {
    setTasks([{ title: 'updated task', status: false }]);
  }, []);

  return (
    <AppContext.Provider value={contextValues}>
      <MockTask />
    </AppContext.Provider>
  );
}

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
