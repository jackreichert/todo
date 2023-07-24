import '../App.scss';
import { useEffect, useContext } from 'react';

import TaskInput from './TaskInput/index';
import List from './TaskList/index';

import { getTasks } from '../utils';
import AppContext from '../context';

function App() {
  const { setTasks } = useContext(AppContext);

  useEffect(() => {
    getTasks(setTasks);
  }, [setTasks]);

  return (
    <>
      <h1 className="font-mono mb-4">Over-Engineered To Do App</h1>
      <TaskInput title="" />
      <List />
    </>
  );
}

export default App;
