import React, {useContext, useState} from "react";
import { InputError } from "../InputError/index.tsx";
import {AppContext} from "../../context.ts";
import {TaskType} from "../../types";

export function TaskInput() {
    const [taskInput, setTaskInput] = useState<string>('')
    const {tasks, setTasks} = useContext(AppContext)
    const [wasChanged, setWasChanged] = useState(false)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setWasChanged(true)
        setTaskInput(event.target.value)
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        setWasChanged(true)
        if (event.key === 'Enter' && isValid()) {
            updateTaskList()
        }
    }

    function handleClick() {
        if (isValid()) {
            updateTaskList()
        }
    }

    function updateTaskList() {
        const newItem: TaskType = {title: taskInput, status: false}
        setTasks([...tasks, newItem])
        setTaskInput('')
        setWasChanged(false)
    }

    function isValid():boolean {
        return taskInput.length >= 3;
    }

    return (
        <div>
            <input
                data-testid='task-input'
                type='text'
                placeholder={`add your next task to do`}
                className={`p-4 border-solid border-2 border-slate-300 rounded-lg`}
                value={taskInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setWasChanged(false)}
                minLength={3}
            />
            <button
                data-testid='task-submit'
                className={`ml-2 p-4 border-solid border-2 border-slate-300`}
                onClick={handleClick}
            >
                click to add
            </button>
            <InputError isError={!isValid() && wasChanged} />
        </div>
    )
}