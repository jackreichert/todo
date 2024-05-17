import { ListType, TaskType } from '@/types';

export async function createList(listData:ListType) {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/list/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listData),
  });
  return response.json();
}

export async function fetchLists() {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/list/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function createTask(taskData:TaskType, listId:string) {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/list/${listId}/task/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function fetchTasks(listId:string) {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/list/${listId}/task/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
