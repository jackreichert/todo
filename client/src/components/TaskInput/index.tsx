import React, {useContext, useState} from "react";
import {AppContext} from "../../context.ts";
import {TaskType} from "../../types";

export function TaskInput() {
    const [taskInput, setTaskInput] = useState<string>('')
    const {tasks, setTasks} = useContext(AppContext)
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTaskInput(event.target.value)
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
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
    }

    function isValid():boolean {
        return taskInput.length >= 3
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
                minLength={3}
            />
            <button
                data-testid='task-submit'
                className={`ml-2 p-4 border-solid border-2 border-slate-300`}
                onClick={handleClick}
            >
                click to add
            </button>
        </div>
    )
}