import {useState} from 'react'
import './App.scss'

import {TaskType} from "./types/";
import {AppContext} from "./context";

function App() {
const [tasks, setTasks] = useState<TaskType[]>([])

  return (
    <AppContext.Provider value={{tasks, setTasks}}>
      <h1 className={`font-mono`}>Over-Engineered To Do App</h1>
    </AppContext.Provider>
  )
}

export default App
