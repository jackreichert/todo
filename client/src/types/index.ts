import React from "react";

export interface TaskType {
    task:string;
    status:boolean;
}

export interface AppContextType {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}
