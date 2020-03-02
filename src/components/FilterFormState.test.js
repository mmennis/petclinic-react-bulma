import React from 'react'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import FilterFormState from './FilterFormState'

describe('FilterFormState', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render as per the snapshot', () => {
        const callback = jest.fn()
        const stateFilterForm = create(<FilterFormState handleFilterUpdate={callback}/>)
        expect(stateFilterForm.toJSON()).toMatchSnapshot()
    })

    it('should log an error to the console if required owner props missing', () => {
        console.error = jest.fn();
        React.createElement(FilterFormState)
        expect(console.error).toHaveBeenCalledTimes(1)
    })

    it('should call the handleFilterUpdate function with an expected value', () => {
        const callback = jest.fn()
        const { getByTestId } = render(<FilterFormState handleFilterUpdate={callback} />)
        fireEvent.change(getByTestId("input"), { target: { value: 'CA' }})
        fireEvent.submit(getByTestId("form"))
        expect(callback).toHaveBeenCalledWith({ stateFilter: 'CA' })
    })

    it('should ignore whitespace and pass on trimmed entry', () => {
        const callback = jest.fn()
        const { getByTestId } = render(<FilterFormState handleFilterUpdate={callback} />)
        fireEvent.change(getByTestId("input"), { target: { value: 'CA ' }})
        fireEvent.submit(getByTestId("form"))
        expect(callback).toHaveBeenCalledWith({ stateFilter: 'CA' })
    })

    it('should convert entry to upper case', () => {
        const callback = jest.fn()
        const { getByTestId } = render(<FilterFormState handleFilterUpdate={callback} />)
        fireEvent.change(getByTestId("input"), { target: { value: 'ca' }})
        fireEvent.submit(getByTestId("form"))
        expect(callback).toHaveBeenCalledWith({ stateFilter: 'CA' })
    })

})