import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import NewVetForm from './NewVetForm'

const testVet = {
    first_name: 'First',
    last_name: 'Last',
    office_hours: '8:00 AM - 5:00 PM',
    address: '1234 Main St',
    city: 'Nowhere',
    state: 'CA',
    telephone: '1-890-635-1279',
    specialty: 'surgery'
}

describe('NewVetForm', () => {

    let handleNewVetCallback

    beforeEach(() => {
        handleNewVetCallback = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render as per the snapshot', () => {
        const newVetForm = create(<NewVetForm handleNewVet={handleNewVetCallback} />)
        expect(newVetForm.toJSON()).toMatchSnapshot()
    })

    describe('modal form', () => {

        beforeEach(() => {
            handleNewVetCallback = jest.fn()
        })

        it('should be invisible before new vet button is clicked ', () => {
            const { queryByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
            expect(queryByTestId('first-name-input')).toBeNull()
        })
    
        it('should become visable once the modal button has been clicked', () => {
            const { queryByTestId, getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(queryByTestId('first-name-input')).not.toBeNull()
        })

        it('should make the modal form invisable once the cancel button has been clicked', () => {
            const { queryByTestId, getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(queryByTestId('first-name-input')).not.toBeNull()
            fireEvent.click(getByTestId('cancel-button'))
            expect(queryByTestId('first-name-input')).toBeNull()
        })
    })

    describe('data entry form', () => {

        beforeEach(() => {
            handleNewVetCallback = jest.fn()
        })

        it('should disable the Add Vet button if fields are empty', () => {
            const { getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('add-vet-button').disabled).toBe(true)
        })

        it('should enable the Add Vet button if all fields have values', () => {
            const { getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            fireEvent.change(getByTestId("first-name-input"), { target: { value: testVet.first_name}})
            fireEvent.change(getByTestId("last-name-input"), { target: { value: testVet.last_name}})
            fireEvent.change(getByTestId("specialty-input"), { target: { value: testVet.specialty}})
            fireEvent.change(getByTestId("office-hours-input"), { target: { value: testVet.office_hours}})
            fireEvent.change(getByTestId("address-input"), { target: { value: testVet.address}})
            fireEvent.change(getByTestId("city-input"), { target: { value: testVet.city}})
            fireEvent.change(getByTestId("state-input"), { target: { value: testVet.state}})
            fireEvent.change(getByTestId("telephone-input"), { target: { value: testVet.telephone}})
            expect(getByTestId('add-vet-button').disabled).toBe(false)
        })

        it('should disnable the Add Vet button if all fields have values but on is reverted', () => {
            const { getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            expect(getByTestId('add-vet-button').disabled).toBe(true)
            fireEvent.change(getByTestId("first-name-input"), { target: { value: testVet.first_name}})
            fireEvent.change(getByTestId("last-name-input"), { target: { value: testVet.last_name}})
            fireEvent.change(getByTestId("specialty-input"), { target: { value: testVet.specialty}})
            fireEvent.change(getByTestId("office-hours-input"), { target: { value: testVet.office_hours}})
            fireEvent.change(getByTestId("address-input"), { target: { value: testVet.address}})
            fireEvent.change(getByTestId("city-input"), { target: { value: testVet.city}})
            fireEvent.change(getByTestId("state-input"), { target: { value: testVet.state}})
            fireEvent.change(getByTestId("telephone-input"), { target: { value: testVet.telephone}})
            expect(getByTestId('add-vet-button').disabled).toBe(false)
            fireEvent.change(getByTestId("telephone-input"), { target: { value: ''}})
            expect(getByTestId('add-vet-button').disabled).toBe(true)
        })

        it('should call the handleNewVet callback if add-vet button is clicked', () => {
            const { getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
            fireEvent.click(getByTestId('modal-open'))
            fireEvent.change(getByTestId("first-name-input"), { target: { value: testVet.first_name}})
            fireEvent.change(getByTestId("last-name-input"), { target: { value: testVet.last_name}})
            fireEvent.change(getByTestId("specialty-input"), { target: { value: testVet.specialty}})
            fireEvent.change(getByTestId("office-hours-input"), { target: { value: testVet.office_hours}})
            fireEvent.change(getByTestId("address-input"), { target: { value: testVet.address}})
            fireEvent.change(getByTestId("city-input"), { target: { value: testVet.city}})
            fireEvent.change(getByTestId("state-input"), { target: { value: testVet.state}})
            fireEvent.change(getByTestId("telephone-input"), { target: { value: testVet.telephone}})
            expect(getByTestId('add-vet-button').disabled).toBe(false)
            fireEvent.click(getByTestId('add-vet-button'))
            expect(handleNewVetCallback).toHaveBeenCalledTimes(1)
            expect(handleNewVetCallback).toHaveBeenCalledWith(testVet)
        })

        const cases = [
            ['first-name-input', 'first-name-error', 'First name must have a value'],
            ['last-name-input', 'last-name-error', 'Last name must have a value'],
            ['specialty-input', 'specialty-error', 'Specialty must have a value'],
            ['office-hours-input', 'office-hours-error', 'Office Hours required'],
            ['address-input', 'address-error', 'Street Addr. must have a value'],
            ['city-input', 'city-error', 'City must have a value'],
            ['state-input', 'state-error', 'State must have a value'],
            ['telephone-input', 'telephone-error', 'Telephone number must be present'],
        ]
        test.each(cases)(
            'should if %s is cleared show an error in %s like this %s', (inputField, errorField, errorMsg) => {
                const { getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
                fireEvent.click(getByTestId('modal-open'))
                fireEvent.change(getByTestId(inputField), { target: { value: testVet.first_name}})
                expect(getByTestId(errorField).firstChild).toBeNull()
                fireEvent.change(getByTestId(inputField), { target: { value: ''}})
                expect(getByTestId(errorField).firstChild).not.toBeNull()
                expect(getByTestId(errorField).firstChild).toMatchInlineSnapshot(errorMsg)
            }
        )
        test.each(cases)(
            'should if %s is re-entered remove the error in %s like this: %s ',(inputField, errorField, errorMsg) => {
                const { getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
                fireEvent.click(getByTestId('modal-open'))
                fireEvent.change(getByTestId(inputField), { target: { value: testVet.first_name}})
                expect(getByTestId(errorField).firstChild).toBeNull()
                fireEvent.change(getByTestId(inputField), { target: { value: ''}})
                expect(getByTestId(errorField).firstChild).not.toBeNull()
                expect(getByTestId(errorField).firstChild).toMatchInlineSnapshot(errorMsg)
                fireEvent.change(getByTestId(inputField), { target: { value: testVet.first_name}})
                expect(getByTestId(errorField).firstChild).toBeNull()
            }
        )
        test.each(cases)(
            'should disable the submit button if %s is cleared and error field % should be %s', 
                (inputField, errorField, errorMsg) => {
                    const { getByTestId } = render(<NewVetForm handleNewVet={handleNewVetCallback} />)
                    fireEvent.click(getByTestId('modal-open'))
                    expect(getByTestId('add-vet-button').disabled).toBe(true)
                    fireEvent.change(getByTestId("first-name-input"), { target: { value: testVet.first_name}})
                    fireEvent.change(getByTestId("last-name-input"), { target: { value: testVet.last_name}})
                    fireEvent.change(getByTestId("specialty-input"), { target: { value: testVet.specialty}})
                    fireEvent.change(getByTestId("office-hours-input"), { target: { value: testVet.office_hours}})
                    fireEvent.change(getByTestId("address-input"), { target: { value: testVet.address}})
                    fireEvent.change(getByTestId("city-input"), { target: { value: testVet.city}})
                    fireEvent.change(getByTestId("state-input"), { target: { value: testVet.state}})
                    fireEvent.change(getByTestId("telephone-input"), { target: { value: testVet.telephone}})
                    expect(getByTestId('add-vet-button').disabled).toBe(false)
                    fireEvent.change(getByTestId(inputField), { target: { value: ''}})
                    expect(getByTestId(errorField).firstChild).not.toBeNull()
                    expect(getByTestId(errorField).firstChild).toMatchInlineSnapshot(errorMsg)
                    expect(getByTestId('add-vet-button').disabled).toBe(true)   
                }
        )
    })

})