import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import NewVetForm from './NewVetForm'

const testVet = {
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

describe('NewVetForm', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render as per the snapshot', () => {
        const callback = jest.fn()
        const newVetForm = create(<NewVetForm handleNewVet={callback} />)
        expect(newVetForm.toJSON()).toMatchSnapshot()
    })
})