import {TaskType} from "../../types";
import {useContext} from "react";
import {AppContext} from "../../context.ts";

export function Task({title, status}: TaskType) {
    const {tasks, setTasks} = useContext(AppContext);

    function handleChange() {
        const newTasks: TaskType[] = tasks.map(task => title === task.title ? {
            title: task.title,
            status: !task.status
        } : task)
        setTasks(newTasks)
    }

    return (
        <li className={`list-none my-4 flex justify-between`}>
            {title}
            <input type="checkbox" checked={status} onChange={handleChange}/>
        </li>
    )
}