import React from 'react'
import { create } from 'react-test-renderer'
import { render } from '@testing-library/react'
import OwnerTile from './OwnerTile'

const testOwner = {
    first_name: 'First',
    last_name: 'Last',
    address: '1234 Main St.',
    city: 'Cupertino',
    state: 'CA',
    telephone: '408-555-1212',
    pets: ['fido']
}

describe('OwnerTile', () => {
    it('should render as per the snapshot', () => {
        const ownerTile = create(<OwnerTile owner={testOwner} />)
        expect(ownerTile.toJSON()).toMatchSnapshot()
    })

    it('should have owner details in the output', () => {
        console.error = jest.fn()
        const { getByText } = render(<OwnerTile owner={testOwner} />)
        const ownerFName = getByText(/First/i)
        expect(ownerFName).toBeInTheDocument()
        const ownerLName = getByText(/Last/i)
        expect(ownerLName).toBeInTheDocument()
        const city = getByText(/Cupertino/i)
        expect(city).toBeInTheDocument()
    })

})