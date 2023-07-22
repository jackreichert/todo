import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { TaskType } from '../types';

const apiAxios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5001/graphql',
});

function fetchTasksFromApi(httpClient: AxiosInstance) {
  const query = `
     query {
       tasks {
         title
         status
       }
     }
   `;

  return httpClient.post('', { query })
    .then((response: { data: { data: { tasks: TaskType[]; }; }; }) => response.data.data.tasks);
}

// eslint-disable-next-line import/prefer-default-export
export async function getTasks(setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>) {
  const tasks = await fetchTasksFromApi(apiAxios);
  setTasks(tasks);
}
