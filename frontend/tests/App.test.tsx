import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  it, expect, describe, beforeEach,
} from 'vitest';
import App from '../src/components/App';
import MockProvider from './MockProvider';

describe('App', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import.meta.env.VITE_REACT_APP_API_URL = 'http://localhost:3000';
  });

  it('renders App component', () => {
    render(<App />);

    expect(screen.getByText('Over-Engineered To Do App')).toBeInTheDocument();
  });

  it('renders MockProvider component', () => {
    render(<MockProvider />);

    expect(screen.getByText('Over-Engineered To Do App')).toBeInTheDocument();
  });

  it('contains an Input component', () => {
    const { getByTestId } = render(<MockProvider />);
    expect(getByTestId('task-input')).toBeInTheDocument();
  });

  it('contains a List of Tasks', () => {
    const { getByTestId } = render(<MockProvider />);
    expect(getByTestId('task-list')).toBeInTheDocument();
  });

  it('adds items to the List', () => {
    const { getByTestId, getAllByRole } = render(<MockProvider />);
    const input = getByTestId('task-input') as HTMLInputElement;
    const button = getByTestId('task-submit') as HTMLButtonElement;
    const taskTitle = 'Go to the store';

    let items = getAllByRole('listitem') as HTMLElement[];
    expect(items.length).toEqual(4);

    fireEvent.change(input, { target: { value: taskTitle } });
    fireEvent.click(button);

    const list = getByTestId('task-list') as HTMLElement;
    expect(list.textContent).toContain(taskTitle);

    items = getAllByRole('listitem') as HTMLElement[];
    expect(items.length).toEqual(5);
  });

  it('does not add empty items to the List', () => {
    const { getByTestId, getAllByRole } = render(<MockProvider />);
    const input = getByTestId('task-input') as HTMLInputElement;
    const button = getByTestId('task-submit') as HTMLButtonElement;

    let items = getAllByRole('listitem') as HTMLElement[];
    expect(items.length).toEqual(4);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    items = getAllByRole('listitem') as HTMLElement[];
    expect(items.length).toEqual(4);
  });
});
