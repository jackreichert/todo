import {useState} from 'react'
import './App.scss'

import {TaskType} from "./types/";
import {AppContext} from "./context";
import {TaskInput} from "./components/TaskInput";
import {List} from "./components/TaskList";

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([])

    return (
        <div className="container mx-auto">
            <AppContext.Provider value={{tasks, setTasks}}>
                <h1 className={`font-mono mb-4`}>Over-Engineered To Do App</h1>
                <TaskInput/>
                <List/>
            </AppContext.Provider>
        </div>
    )
}

export default App
