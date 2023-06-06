import {AppContext} from "../src/context";
import {describe} from "vitest";

import {useContext, useEffect, useState} from "react";
import {render} from "@testing-library/react";
import {TaskType} from "../src/types";

const Task = function () {
    const {tasks} = useContext(AppContext);
    return (<li>{tasks[0].title} <input type="checkbox" checked={tasks[0].status}/></li>)
}

const MockApp = function () {
    const singleTask: TaskType[] = [{title: 'first task', status: true}]
    const [tasks, setTasks] = useState<TaskType[]>(singleTask)

    useEffect(() => {
        setTasks([{title: 'updated task', status: false}])
    }, [])

    return (
        <AppContext.Provider value={{tasks, setTasks}}>
            <Task/>
        </AppContext.Provider>
    );
}
describe('AppContext', () => {
    it('contains task objects', () => {
        const wrapper = render(<MockApp/>)
        expect(wrapper.getByText(/updated task/i)).toBeInTheDocument()
        expect(wrapper.getByRole('checkbox')).not.toBeChecked()
    });
});