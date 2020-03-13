import React from 'react'
import { locales, LanguageContext } from './LanguageContext'
import { Form } from 'react-bulma-components'
import ReactCountryFlag from 'react-country-flag'

export default class LanguageSelector extends React.Component {

    render() {
        return(
            <LanguageContext.Consumer>
                { value => (
                    <div>
                        
                        <Form.Field horizontal={true}>
                            <Form.Label size="small">Lang:</Form.Label>
                            <Form.Control>
                                <Form.Select size="small" color="primary" marginless={true} value={value.lang} onChange={value.updateLocale} data-testid="select">
                                    <option value="en">English</option>
                                    <option value="es">Espanol</option>
                                    <option value="fr">Francais</option>
                                </Form.Select>
                            </Form.Control>                        
                            <ReactCountryFlag countryCode={locales[value.lang].flag} svg style={{ 'height': '2em', 'width': '2em' }}/>
                        </Form.Field>
                    </div>
                    
                )}
            </LanguageContext.Consumer>
        )
    }
}

LanguageSelector.contextType = LanguageContext