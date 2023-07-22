import '@testing-library/jest-dom';
import {
  it, expect, describe, vi,
} from 'vitest';
import { render } from '@testing-library/react';
import { MockApp } from './MockProvider';

vi.mock('../src/utils', () => ({
  getTasks: vi.fn(),
}));

describe('AppContext', () => {
  it('contains task objects', () => {
    const wrapper = render(<MockApp />);
    expect(wrapper.getByText(/updated task/i)).toBeInTheDocument();
    expect(wrapper.getByRole('checkbox')).not.toBeChecked();
  });
});
