import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent, getByTestId } from '@testing-library/react'
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
        const callback = jest.fn()
        const ownerTile = create(<OwnerTile owner={testOwner} handleDeleteOwner={callback}/>)
        expect(ownerTile.toJSON()).toMatchSnapshot()
    })

    it('should have owner details in the output', () => {
        const callback = jest.fn()
        console.error = jest.fn()
        const { getByText } = render(<OwnerTile owner={testOwner}  handleDeleteOwner={callback}/>)
        const ownerFName = getByText(/First/i)
        expect(ownerFName).toBeInTheDocument()
        const ownerLName = getByText(/Last/i)
        expect(ownerLName).toBeInTheDocument()
        const city = getByText(/Cupertino/i)
        expect(city).toBeInTheDocument()
    })

    it('should log an error to the console if required owner props missing', () => {
        console.error = jest.fn();
        React.createElement(OwnerTile)
        expect(console.error).toHaveBeenCalledTimes(2);
    })

    it('should call the handleDeleteOwner callback when delete is clicked', () => {
        const callback = jest.fn()
        console.error = jest.fn()
        const { getByTestId } = render(<OwnerTile owner={testOwner}  handleDeleteOwner={callback}/>)
        fireEvent.click(getByTestId('delete-button'))
        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledWith(testOwner)
    })

})