import '../App.scss'
import {TaskInput} from "./TaskInput";
import {List} from "./TaskList";

function App() {
    return (
        <>
            <h1 className={`font-mono mb-4`}>Over-Engineered To Do App</h1>
            <TaskInput/>
            <List/>
        </>
    )
}

export default App
