import '@testing-library/jest-dom';
import {
  it, expect, describe,
} from 'vitest';
import { render } from '@testing-library/react';
import { MockApp } from './MockProvider';

describe('AppContext', () => {
  it('contains task objects', () => {
    const wrapper = render(<MockApp />);
    expect(wrapper.getByText(/updated task/i)).toBeInTheDocument();
    expect(wrapper.getByRole('checkbox')).not.toBeChecked();
  });
});
