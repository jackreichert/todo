import React from 'react';

export interface TaskType {
  title:string;
  status:boolean;
}

export interface AppContextType {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export interface IsErrorProp {
  isError: boolean;
}

export interface TaskInputProp {
  title: string;
  isEdit: boolean;
}
