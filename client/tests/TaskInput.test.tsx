import * as React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {TaskInput} from "../src/components/TaskInput";

describe('Input', () => {
    it('contains an input html element', () => {
        const {getByPlaceholderText} = render(<TaskInput/>)

        expect(getByPlaceholderText('add your next task to do')).toBeInTheDocument();
    });

    test('input field test with click', () => {
        const {getByTestId} = render(<TaskInput/>);
        const input = getByTestId('task-input') as HTMLInputElement;
        const button = getByTestId('task-submit') as HTMLButtonElement;
        fireEvent.change(input, {target: {value: 'test'}});
        expect(input.value).toBe('test');
        fireEvent.click(button)
        expect(input.value).toBe('');
    });

    test('input field test with enter', () => {
        const {getByTestId} = render(<TaskInput/>);
        const input = getByTestId('task-input') as HTMLInputElement;
        fireEvent.change(input, {target: {value: 'test'}});
        expect(input.value).toBe('test');
        fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
        expect(input.value).toBe('');
    });
});
