import React from 'react'
import { create } from 'react-test-renderer'
import { render } from '@testing-library/react'
import OwnerCard from './OwnerCard'

const testOwner = {
    first_name: 'First',
    last_name: 'Last',
    address: '1234 Main St.'
}

describe('OwnerCard', () => {

    it('should render as per the snapshot', () => {
        const ownerCard = create(<OwnerCard owner={testOwner} />)
        expect(ownerCard.toJSON()).toMatchSnapshot();
    })

    it('should have owner details in the output', () => {
        console.error = jest.fn()
        const { getByText } = render(<OwnerCard owner={testOwner} />)
        const ownerFName = getByText(/First/i)
        expect(ownerFName).toBeInTheDocument()
        const ownerLName = getByText(/Last/i)
        expect(ownerLName).toBeInTheDocument()
        const addr = getByText(/Main/i)
        expect(addr).toBeInTheDocument()
    })

    it('should log an error to the console if required owner props missing', () => {
        console.error = jest.fn();
        React.createElement(OwnerCard)
        expect(console.error).toHaveBeenCalledTimes(1);
    })
})