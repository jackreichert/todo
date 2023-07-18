import '../App.scss';

import React, { useEffect, useContext } from 'react';

import TaskInput from './TaskInput/index.tsx';
import List from './TaskList/index.tsx';

// import { getTasks } from '../utils.ts';
import AppContext from '../context.ts';

function App() {
  const { setTasks } = useContext(AppContext);

  useEffect(() => {
    // getTasks(setTasks);
  }, [setTasks]);

  return (
    <>
      <h1 className="font-mono mb-4">Over-Engineered To Do App</h1>
      <TaskInput />
      <List />
    </>
  );
}

export default App;
