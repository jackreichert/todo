import * as React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
    it('renders App component', () => {
        render(<App />);

        expect(screen.getByText('Over-Engineered To Do App')).toBeInTheDocument();
    });
});
