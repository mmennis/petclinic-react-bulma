import React from 'react'
import { LanguageContext } from './LanguageContext'
import LanguageSelector from './LanguageSelector'
import { create } from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'

const ctx = {
    lang: 'en',
    updateLocale: jest.fn()
}
const renderLanguageSelector = () => {
    return render(
        <LanguageContext.Provider value={ctx} >
            <LanguageSelector />
        </LanguageContext.Provider>
    )
}

describe('LanguageSelector', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should match the saved snapshot', () => {
        const langSelector = create(<LanguageSelector />)
        expect(langSelector).toMatchSnapshot()
    })

    it('should call the updateLocal method in the context', () => {
        const { getByTestId } = renderLanguageSelector()
        fireEvent.change(getByTestId('select'), {target: { value: 'fr'}})
        expect(ctx.updateLocale).toHaveBeenCalled()
        expect(ctx.lang).toBe('en')
    })

    it('should update the context if a valid updateLocale method is available', () => {
        ctx.updateLocale = (e) => {
            ctx.lang = e.target.value
        }
        const { getByTestId } = renderLanguageSelector()
        fireEvent.change(getByTestId('select'), {target: { value: 'fr'}})
        expect(ctx.lang).toBe('fr')
    })
    
})