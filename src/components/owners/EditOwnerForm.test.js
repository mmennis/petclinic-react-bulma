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

    it('should do something', () => {
        expect(2).toBeTruthy()
    })
})