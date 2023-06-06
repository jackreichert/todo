import React from "react";

export interface TaskType {
    title:string;
    status:boolean;
}

export interface AppContextType {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}
