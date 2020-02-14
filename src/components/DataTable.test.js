import React from 'react';
import { TableHeader } from './DataTable';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';


describe ('DataTableModule', () => {

    describe('TableHeader', () => {
        it('should render a table header per snapshot', () => {
            const tableHeader = create(<TableHeader headers={['one', 'two', 'three', 'four']} />);
            expect(tableHeader.toJSON()).toMatchSnapshot();
        })

        it('should have the headers in the table headers', () => {
            console.error = jest.fn();
            const { getByText } = render(<TableHeader headers={['testheader']}/>);
            const header = getByText(/testheader/i);
            expect(header).toBeInTheDocument();
            expect(console.error).toHaveBeenCalledTimes(1); // getByText logs an error
        })

        it('should fail to work if headers is missing', () => {
            console.error = jest.fn();
            React.createElement(TableHeader);
            expect(console.error).toHaveBeenCalledTimes(1);
        })
    })


})