import {useContext} from "react";
import {AppContext} from "../../context.ts";
import {Task} from "../Task"

export function List() {
    const {tasks} = useContext(AppContext)

    return (<ul data-testid='task-list'>
        {tasks.map((task, index) => (
            <Task key={`item-${index}`} title={task.title} status={task.status}/>
        ))}
    </ul>)
}

