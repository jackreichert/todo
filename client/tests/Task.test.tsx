import {fireEvent, render} from "@testing-library/react";
import App from "../src/App";
import * as React from "react";

describe('Task', () => {
    it('can toggle the completed checkbox', () => {
        const {getByTestId} = render(<App/>);
        const input = getByTestId('task-input') as HTMLInputElement;
        const button = getByTestId('task-submit') as HTMLButtonElement;
        const taskTitle = 'Go to the store'

        fireEvent.change(input, {target: {value: taskTitle}});
        fireEvent.click(button)

        const list = getByTestId('task-list') as HTMLElement
        expect(list.textContent).toContain(taskTitle)
    })
})