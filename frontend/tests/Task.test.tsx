import '@testing-library/jest-dom';
import {
  ByRoleOptions, fireEvent, render, within,
} from '@testing-library/react';
import {
  it, expect, describe, vi,
} from 'vitest';

import MockProvider from './MockProvider';

vi.mock('../src/utils', () => ({
  getTasks: vi.fn(),
}));

describe('Task', () => {
  it('can toggle the completed checkbox', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    const items = getAllByRole('listitem');
    const checkboxes = getAllByRole('checkbox', { container: items } as ByRoleOptions);

    expect(checkboxes[1]).not.toBeChecked();
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
  });

  it('deletes when delete is clicked', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    let items = getAllByRole('listitem');
    const button = getAllByRole('button', { container: items[0] } as ByRoleOptions);

    expect(button[1]).toBeDefined();
    expect(button[1]).toHaveTextContent('Delete');
    expect(items[0]).toHaveTextContent('Go to the store');

    fireEvent.click(button[1]);
    items = getAllByRole('listitem');
    expect(items[0]).not.toHaveTextContent('Go to the store');
  });

  it('has an edit button', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    const items = getAllByRole('listitem');
    const button = getAllByRole('button', { container: items } as ByRoleOptions);

    expect(button[0]).toBeDefined();
    expect(button[0]).toHaveTextContent('Edit');
  });

  it('when edit is clicked, makes title editable, and adds buttons for editing', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    let items = getAllByRole('listitem');
    let buttons = getAllByRole('button', { container: items } as ByRoleOptions);

    expect(buttons[0]).toBeDefined();
    expect(buttons[0]).toHaveTextContent('Edit');
    fireEvent.click(buttons[0]);
    items = getAllByRole('listitem');
    const inputs = getAllByRole('textbox', { container: items[0] } as ByRoleOptions);
    expect(inputs).toBeDefined();
    buttons = getAllByRole('button', { container: items[0] } as ByRoleOptions);
    expect(buttons[0]).not.toHaveTextContent('Edit');
    expect(buttons[0]).toHaveTextContent('Save');
    expect(buttons[1]).toHaveTextContent('Cancel');
  });

  it('when cancel is clicked, title reverts to original title', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    let items = getAllByRole('listitem');
    let buttons = getAllByRole('button', { container: items } as ByRoleOptions);
    const { getByTestId } = within(items[0]);
    let title = getByTestId('task-title') as HTMLInputElement;
    expect(title).toHaveTextContent('Go to the store');

    expect(buttons[0]).toBeDefined();
    expect(buttons[0]).toHaveTextContent('Edit');
    fireEvent.click(buttons[0]);
    items = getAllByRole('listitem');

    const inputs = getAllByRole('textbox', { container: items[0] } as ByRoleOptions);
    expect(inputs).toBeDefined();

    buttons = getAllByRole('button', { container: items[0] } as ByRoleOptions);
    expect(buttons[1]).toBeDefined();
    expect(buttons[1]).toHaveTextContent('Cancel');

    fireEvent.change(inputs[0], { target: { value: 'Do not go to the store' } });
    fireEvent.click(buttons[1]);
    items = getAllByRole('listitem');
    title = getByTestId('task-title') as HTMLInputElement;
    expect(title).toHaveTextContent('Go to the store');
  });

  it('when save is clicked, title is updated', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    let items = getAllByRole('listitem');
    let buttons = getAllByRole('button', { container: items } as ByRoleOptions);
    const { getByTestId: beforeGetByTestId } = within(items[0]);
    let title = beforeGetByTestId('task-title') as HTMLInputElement;
    expect(title).toHaveTextContent('Go to the store');

    expect(buttons[0]).toBeDefined();
    expect(buttons[0]).toHaveTextContent('Edit');
    fireEvent.click(buttons[0]);

    items = getAllByRole('listitem');
    const inputs = getAllByRole('textbox', { container: items[0] } as ByRoleOptions);
    expect(inputs).toBeDefined();

    buttons = getAllByRole('button', { container: items[0] } as ByRoleOptions);
    expect(buttons[0]).toBeDefined();
    expect(buttons[0]).toHaveTextContent('Save');

    fireEvent.change(inputs[0], { target: { value: 'Do not go to the store' } });
    fireEvent.click(buttons[0]);
    items = getAllByRole('listitem');
    const { getByTestId: afterGetByTestId } = within(items[0]);
    title = afterGetByTestId('task-title') as HTMLInputElement;
    expect(title).toHaveTextContent('Do not go to the store');
  });
});
