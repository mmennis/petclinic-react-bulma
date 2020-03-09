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

})