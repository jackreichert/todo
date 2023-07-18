import '../App.scss';

import React, { useEffect, useContext } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies

import TaskInput from './TaskInput/index.tsx';
import List from './TaskList/index.tsx';

import AppContext from '../context.ts';

function App() {
  const { setTasks } = useContext(AppContext);

  const query = `
    query {
      tasks {
        title
        status
      }
    }
  `;

  useEffect(() => {
    axios.post('http://localhost:5001/graphql', { query })
      .then((response) => setTasks(response.data.data.tasks));
  }, [query, setTasks]);

  return (
    <>
      <h1 className="font-mono mb-4">Over-Engineered To Do App</h1>
      <TaskInput />
      <List />
    </>
  );
}

export default App;
