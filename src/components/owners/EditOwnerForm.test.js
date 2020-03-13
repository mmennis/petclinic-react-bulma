import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import EditOwnerForm from './EditOwnerForm'

const testOwner = {
    _id: '123456ABCD',
    first_name: 'First',
    last_name: 'Last',
    address: '1234 Main St',
    city: 'Nowhere',
    state: 'CA',
    telephone: '1-890-635-1279',
}

describe('EditOwnerForm', () => {

    let handleOwnerCallback

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render as per the snapshot', () => {
        const callback = jest.fn()
        const editOwnerForm = create(<EditOwnerForm owner={testOwner} handleOwnerUpdate={callback} />)
        expect(editOwnerForm.toJSON()).toMatchSnapshot()
    })

    describe('modal form', () => {

        beforeEach(() => {
            handleOwnerCallback = jest.fn()
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('should hide the form if Edit button has not been clicked', () => {
            const { queryByTestId } = render(<EditOwnerForm owner={testOwner} handleOwnerUpdate={handleOwnerCallback} />)
            expect(queryByTestId('first-name-input')).toBeNull()
        })

        it('should show the form if Edit button is clicked', () => {
            const { queryByTestId, getByTestId } = render(<EditOwnerForm owner={testOwner} handleOwnerUpdate={handleOwnerCallback} />)
            expect(queryByTestId('first-name-input')).toBeNull()
            fireEvent.click(getByTestId('modal-open'))
            expect(queryByTestId('first-name-input')).not.toBeNull()
        })

        it('should hide the form again if the cancel button is clicked', () => {
            const { queryByTestId, getByTestId } = render(<EditOwnerForm owner={testOwner} handleOwnerUpdate={handleOwnerCallback} />)
            expect(queryByTestId('first-name-input')).toBeNull()
            fireEvent.click(getByTestId('modal-open'))
            expect(queryByTestId('first-name-input')).not.toBeNull()
            fireEvent.click(getByTestId('cancel-button'))
            expect(queryByTestId('first-name-input')).toBeNull()
        })
    })

    describe('data entry form', () => {
        beforeEach(() => {
            handleOwnerCallback = jest.fn()
        })

        it('should diable the update button if an error is present', () => {
            const { getByTestId } = render(<EditOwnerForm owner={testOwner} handleOwnerUpdate={handleOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('edit-button').disabled).toBe(false)
            fireEvent.change(getByTestId('first-name-input'), { target: { value: ''}})
            expect(getByTestId('edit-button').disabled).toBe(true)
        })

        it('should re-enable once a value has been entered in the empty field', () => {
            const { getByTestId } = render(<EditOwnerForm owner={testOwner} handleOwnerUpdate={handleOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('edit-button').disabled).toBe(false)
            fireEvent.change(getByTestId('first-name-input'), { target: { value: ''}})
            expect(getByTestId('edit-button').disabled).toBe(true)
            fireEvent.change(getByTestId('first-name-input'), { target: { value: 'test'}})
            expect(getByTestId('edit-button').disabled).toBe(false)
        })

        it('closing the form should reset all the fields back to the cached data', () => {
            const { queryByTestId, getByTestId } = render(<EditOwnerForm owner={testOwner} handleOwnerUpdate={handleOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('edit-button').disabled).toBe(false)
            fireEvent.change(getByTestId('first-name-input'), { target: { value: ''}})
            expect(getByTestId('edit-button').disabled).toBe(true)
            fireEvent.click(getByTestId('cancel-button'))
            expect(queryByTestId('first-name-input')).toBeNull()
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('edit-button').disabled).toBe(false)
        })

        it('should call the handleOwnerUpdate with the changes to the owner fields', () => {
            const { getByTestId } = render(<EditOwnerForm owner={testOwner} handleOwnerUpdate={handleOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            const newOwner = { ...testOwner }
            newOwner.state = 'XX'
            fireEvent.change(getByTestId('state-input'), { target: { value: 'XX' } })
            fireEvent.click(getByTestId('edit-button'))
            expect(handleOwnerCallback).toHaveBeenCalled()
            expect(handleOwnerCallback).toHaveBeenCalledWith(newOwner)
        })
    })

})