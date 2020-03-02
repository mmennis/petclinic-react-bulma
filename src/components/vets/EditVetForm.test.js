import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import EditVetForm from './EditVetForm'

const vetTest = {
    _id: '123456ABCD',
    first_name: 'First',
    last_name: 'Last',
    office_hours: '8:00 AM - 5:00 PM',
    address: '1234 Main St',
    city: 'Nowhere',
    state: 'CA',
    telephone: '1-890-635-1279',
    specialty: 'surgery'
}

describe('EditVetForm', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render as per the snapshot', () => {
        const callback = jest.fn();
        const editVetForm = create(<EditVetForm vet={vetTest} handleVetUpdate={callback}/>)
        expect(editVetForm.toJSON()).toMatchSnapshot()
    })

    it('should log 2 errors to the console if vet and callback property are missing', () => {
        console.error = jest.fn()
        React.createElement(EditVetForm)
        expect(console.error).toHaveBeenCalledTimes(2)
    })

})