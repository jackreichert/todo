import {fireEvent, render, screen} from '@testing-library/react';

import App from '../src/App';
import * as React from "react";

describe('App', () => {
    it('renders App component', () => {
        render(<App/>);

        expect(screen.getByText('Over-Engineered To Do App')).toBeInTheDocument();
    });

    it('contains an Input component', () => {
        const {getByTestId} = render(<App/>);
        expect(getByTestId('task-input')).toBeInTheDocument();
    });

    it('contains a List of Tasks', () => {
        const {getByTestId} = render(<App/>);
        expect(getByTestId('task-list')).toBeInTheDocument();
    });

    it('adds items to the List', () => {
        const {getByTestId} = render(<App/>);
        const input = getByTestId('task-input') as HTMLInputElement;
        const button = getByTestId('task-submit') as HTMLButtonElement;
        const taskTitle = 'Go to the store'

        fireEvent.change(input, {target: {value: taskTitle}});
        fireEvent.click(button)

        const list = getByTestId('task-list') as HTMLElement
        expect(list.textContent).toContain(taskTitle)
    })
});
