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
});
