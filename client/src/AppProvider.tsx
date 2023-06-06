import {useState} from 'react'
import './App.scss'

import {TaskType} from "./types/";
import {AppContext} from "./context";
import App from "./components/App.tsx";

function AppProvider() {
    const [tasks, setTasks] = useState<TaskType[]>([])

    return (
        <div className="container mx-auto">
            <AppContext.Provider value={{tasks, setTasks}}>
                <App/>
            </AppContext.Provider>
        </div>
    )
}

export default AppProvider
