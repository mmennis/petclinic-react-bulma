import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import NewOwnerForm from './NewOwnerForm'

const newTestOwner = {
    first_name: 'first',
    last_name: 'last',
    address: '1234 Main St',
    city: 'Cupertino',
    state: 'CA',
    telephone: '(408) 555-1212'
}

describe('NewOwnerForm', () => {

    let handleNewOwnerCallback

    beforeEach(() => {
        handleNewOwnerCallback = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render as per the snapshot', () => {
        const newOwnerForm = create(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
        expect(newOwnerForm.toJSON()).toMatchSnapshot()
    })

    describe('modal form', () => {

        beforeEach(() => {
            handleNewOwnerCallback = jest.fn()
        })

        it('should be invisible before the new owner buttong is clicked', () => {
            const { queryByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
            expect(queryByTestId('first-name-input')).toBeNull()
        })

        it('should become visible when the new owner is clicked', () => {
            const { queryByTestId, getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
            expect(queryByTestId('first-name-input')).toBeNull()
            fireEvent.click(getByTestId('modal-open'))
            expect(queryByTestId('first-name-input')).not.toBeNull()
        })

        it('should make the modal invisible again is cancel button is clicked', () => {
            const { queryByTestId, getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
            expect(queryByTestId('first-name-input')).toBeNull()
            fireEvent.click(getByTestId('modal-open'))
            expect(queryByTestId('first-name-input')).not.toBeNull()
            fireEvent.click(getByTestId('cancel-button'))
            expect(queryByTestId('first-name-input')).toBeNull()
        })
    })

})