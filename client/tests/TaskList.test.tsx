import '@testing-library/jest-dom';
import { render, within } from '@testing-library/react';
import {
  describe, vi, it, expect,
} from 'vitest';

import List from '../src/components/TaskList';
import MockProvider from './MockProvider';

vi.mock('../src/utils.ts', () => ({
  getTasks: vi.fn(),
}));

describe('List', () => {
  it('contains a list html element', () => {
    const { getByRole } = render(<List />);
    const list = getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('contains lists items', () => {
    const { getByRole } = render(<MockProvider />);

    const list = getByRole('list');
    const { getAllByRole } = within(list);

    const items = getAllByRole('listitem');

    expect(items.length).toBe(4);
  });
});
