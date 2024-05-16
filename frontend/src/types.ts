import React from 'react';

export interface ListType {
  id?: string;
  title: string;
}

export interface TaskType {
  title:string;
  completed:boolean;
}

export interface AppContextType {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  lists: ListType[];
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
  defaultList: string;
  setDefaultList: React.Dispatch<React.SetStateAction<string>>;
}

export interface IsErrorProp {
  isError: boolean;
}

export interface TaskInputProp {
  title: string;
  isEdit: boolean;
}
