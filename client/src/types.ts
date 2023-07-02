import React from 'react';

export interface TaskType {
    title:string;
    status:boolean;
    id?: string;
}

export interface AppContextType {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export interface IsErrorProp {
    isError: boolean
}
