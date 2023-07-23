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

  it('has an edit button', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    const items = getAllByRole('listitem');
    const button = getAllByRole('button', { container: items } as ByRoleOptions);

    expect(button[0]).toBeDefined();
    expect(button[0]).toHaveTextContent('Edit');
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
});
