import React from 'react'
import { create } from 'react-test-renderer'
import { render } from '@testing-library/react'
import VetTile from './VetTile'

const testVet = {
    first_name: 'First',
    last_name: 'Last',
    address: '1234 Main St',
    city: 'Cupertino',
    state: 'CA',
    telephone: '(408) 555-1212',
    office_hours: '8:00 AM - 5:00 PM'
}

describe('VetTile', () => {

    it('should render as per the snapshot', () => {
        const vetTile = create(<VetTile vet={testVet}/>)
        expect(vetTile.toJSON()).toMatchSnapshot()
    })

    it('should have vet details in the output', () => {
        console.error = jest.fn()
        const { getByText } = render(<VetTile vet={testVet} />)
        const vetFName = getByText(/First/i)
        expect(vetFName).toBeInTheDocument();
        const vetLName = getByText(/Last/i)
        expect(vetLName).toBeInTheDocument()
        const vetHours = getByText(/office/i)
        expect(vetHours).toBeInTheDocument()
    })

    it('should log an error to the console if required owner props missing', () => {
        console.error = jest.fn()
        React.createElement(VetTile)
        expect(console.error).toHaveBeenCalledTimes(1)
    })

})