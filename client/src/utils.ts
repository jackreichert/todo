import React from 'react';
import axios from 'axios';
import { TaskType } from './types.ts';

// eslint-disable-next-line import/prefer-default-export
export function getTasks(setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>) {
  const query = `
query {
  tasks {
    title
    status
  }
}
`;
  axios.post('http://localhost:5001/graphql', { query })
    .then((response) => setTasks(response.data.data.tasks));
}
