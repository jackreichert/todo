import * as React from 'react';
import {render} from '@testing-library/react';

import {List} from "../src/components/List";

describe('List', () => {
    it('contains a list html element', () => {
        const {getByRole} = render(<List/>)
        const list = getByRole('list')
        expect(list).toBeInTheDocument()
    })
});
