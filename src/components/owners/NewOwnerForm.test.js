import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import NewOwnerForm from './NewOwnerForm'

import { data } from './owers.localisation.data'
import LocalizedStrings from 'react-localization'
const strings = new LocalizedStrings(data)

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

    describe('data entry form', () => {
        beforeEach(() => {
            handleNewOwnerCallback = jest.fn()
        })

        it('should disable teh add owner button is fields are empty', () => {
            const { getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('add-owner-button').disabled).toBe(true)
        })

        it('should enable the add owner button is all fields have values', () => {
            const { getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('add-owner-button').disabled).toBe(true)
            fireEvent.change(getByTestId('first-name-input'), { target: { value: newTestOwner.first_name }})
            fireEvent.change(getByTestId('last-name-input'), { target: { value: newTestOwner.last_name }})
            fireEvent.change(getByTestId('address-input'), { target: { value: newTestOwner.address }})
            fireEvent.change(getByTestId('city-input'), { target: { value: newTestOwner.city }})
            fireEvent.change(getByTestId('state-input'), { target: { value: newTestOwner.state}})
            fireEvent.change(getByTestId('telephone-input'), { target: { value: newTestOwner.telephone }})
            expect(getByTestId('add-owner-button').disabled).toBe(false)            
        })

        it('should disable the Add Owner button if all fields have values but one is reverted', () => {
            const { getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('add-owner-button').disabled).toBe(true)
            fireEvent.change(getByTestId('first-name-input'), { target: { value: newTestOwner.first_name }})
            fireEvent.change(getByTestId('last-name-input'), { target: { value: newTestOwner.last_name }})
            fireEvent.change(getByTestId('address-input'), { target: { value: newTestOwner.address }})
            fireEvent.change(getByTestId('city-input'), { target: { value: newTestOwner.city }})
            fireEvent.change(getByTestId('state-input'), { target: { value: newTestOwner.state}})
            fireEvent.change(getByTestId('telephone-input'), { target: { value: newTestOwner.telephone }})
            expect(getByTestId('add-owner-button').disabled).toBe(false)
            fireEvent.change(getByTestId('telephone-input'), { target: { value: '' }})
            expect(getByTestId('add-owner-button').disabled).toBe(true)
        })

        it('should call the handleNewOwner callback if add-owner button is clicked', () => {
            const { getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('add-owner-button').disabled).toBe(true)
            fireEvent.change(getByTestId('first-name-input'), { target: { value: newTestOwner.first_name }})
            fireEvent.change(getByTestId('last-name-input'), { target: { value: newTestOwner.last_name }})
            fireEvent.change(getByTestId('address-input'), { target: { value: newTestOwner.address }})
            fireEvent.change(getByTestId('city-input'), { target: { value: newTestOwner.city }})
            fireEvent.change(getByTestId('state-input'), { target: { value: newTestOwner.state}})
            fireEvent.change(getByTestId('telephone-input'), { target: { value: newTestOwner.telephone }})
            expect(getByTestId('add-owner-button').disabled).toBe(false)
            fireEvent.click(getByTestId('add-owner-button'))
            expect(handleNewOwnerCallback).toHaveBeenCalledTimes(1)
            expect(handleNewOwnerCallback).toHaveBeenCalledWith(newTestOwner)
        })

        const cases = [
            ['first-name-input', 'first-name-error', strings.errors.first_name],
            ['last-name-input', 'last-name-error', strings.errors.last_name],
            ['address-input', 'address-error', strings.errors.address],
            ['city-input', 'city-error', strings.errors.city],
            ['state-input', 'state-error', strings.errors.state],
            ['telephone-input', 'telephone-error', strings.errors.telephone],
        ]

        test.each(cases)(
            'if %s is cleared should show an error in %s like this %s',(inputField, errorField, errorMsg) => {
                const { getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
                fireEvent.click(getByTestId('modal-open'))
                expect(getByTestId('add-owner-button').disabled).toBe(true)
                fireEvent.change(getByTestId(inputField), { target: { value: newTestOwner.first_name}})
                expect(getByTestId(errorField).firstChild).toBeNull()
                fireEvent.change(getByTestId(inputField), { target: { value: ''}})
                expect(getByTestId(errorField).firstChild).not.toBeNull()
                expect(getByTestId(errorField).firstChild).toMatchInlineSnapshot(errorMsg)
            }
        )

        test.each(cases)(
            'if %s is re-entered the error in %s is removed',(inputField, errorField, errorMsg) => {
                const { getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
                fireEvent.click(getByTestId('modal-open'))
                expect(getByTestId('add-owner-button').disabled).toBe(true)
                fireEvent.change(getByTestId(inputField), { target: { value: newTestOwner.first_name}})
                expect(getByTestId(errorField).firstChild).toBeNull()
                fireEvent.change(getByTestId(inputField), { target: { value: ''}})
                expect(getByTestId(errorField).firstChild).not.toBeNull()
                expect(getByTestId(errorField).firstChild).toMatchInlineSnapshot(errorMsg)
                fireEvent.change(getByTestId(inputField), { target: { value: newTestOwner.first_name}})
                expect(getByTestId(errorField).firstChild).toBeNull()
            }
        )

        test.each(cases)(
            'if the %s field is cleared and the %s error reads %s then the add owner button should be disabed', 
                (inputField, errorField, errorMsg) => {
                    const { getByTestId } = render(<NewOwnerForm handleNewOwner={handleNewOwnerCallback} />)
                    fireEvent.click(getByTestId('modal-open'))
                    expect(getByTestId('add-owner-button').disabled).toBe(true)
                    fireEvent.change(getByTestId(inputField), { target: { value: newTestOwner.first_name}})
                    expect(getByTestId(errorField).firstChild).toBeNull()
                    fireEvent.change(getByTestId(inputField), { target: { value: ''}})
                    expect(getByTestId(errorField).firstChild).not.toBeNull()
                    expect(getByTestId(errorField).firstChild).toMatchInlineSnapshot(errorMsg)
                    expect(getByTestId('add-owner-button').disabled).toBe(true)
                }
        )
    })

})