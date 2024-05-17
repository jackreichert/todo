import {
  useState, useMemo, useContext, useEffect,
} from 'react';

import '../src/App.scss';
import { ListType, TaskType } from '../src/types';
import AppContext from '../src/context';
import App from '../src/components/App';

const initialState:TaskType[] = [
  { title: 'Go to the store', completed: false },
  { title: 'Buy some cheese', completed: false },
  { title: 'Buy a Vision Pro', completed: true },
  { title: 'Learn to fly', completed: false },
];

function MockTask() {
  const { tasks } = useContext(AppContext);
  const handleChange = () => {};

  return (
    <li>
      {tasks[0].title}
      {' '}
      <input type="checkbox" onChange={handleChange} checked={tasks[0].completed} />
    </li>
  );
}

export function MockApp() {
  const singleTask: TaskType[] = [{ title: 'first task', completed: true }];
  const [tasks, setTasks] = useState<TaskType[]>(singleTask);
  const [lists, setLists] = useState<ListType[]>([]);
  const [defaultList, setDefaultList] = useState<string>('');
  const contextValues = useMemo(() => ({
    tasks, setTasks, lists, setLists, defaultList, setDefaultList,
  }), [tasks, setTasks, lists, setLists, defaultList, setDefaultList]);

  useEffect(() => {
    setTasks([{ title: 'updated task', completed: false }]);
  }, []);

  return (
    <AppContext.Provider value={contextValues}>
      <MockTask />
    </AppContext.Provider>
  );
}

function MockProvider() {
  const [tasks, setTasks] = useState<TaskType[]>(initialState);
  const [lists, setLists] = useState<ListType[]>([]);
  const [defaultList, setDefaultList] = useState<string>('');
  const contextValues = useMemo(() => ({
    tasks, setTasks, lists, setLists, defaultList, setDefaultList,
  }), [tasks, setTasks, lists, setLists, defaultList, setDefaultList]);

  return (
    <div className="container mx-auto">
      <AppContext.Provider value={contextValues}>
        <App />
      </AppContext.Provider>
    </div>
  );
}

export default MockProvider;
