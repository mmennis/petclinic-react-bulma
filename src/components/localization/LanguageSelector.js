import React from 'react'
import { LanguageContext } from './LanguageContext'
import { Form } from 'react-bulma-components'

export default class LanguageSelector extends React.Component {

    render() {
        return(
            <LanguageContext.Consumer>
                { value => (
                    <Form.Field horizontal={true}>
                        <Form.Label size="small">Lang:</Form.Label>
                        <Form.Control>
                            <Form.Select size="small" value={value.lang} onChange={value.updateLocale} data-testid="select">
                                <option value="en">English</option>
                                <option value="es">Espanol</option>
                                <option value="fr">Francais</option>
                            </Form.Select>
                        </Form.Control>
                    </Form.Field>
                )}
            </LanguageContext.Consumer>
        )
    }
}

LanguageSelector.contextType = LanguageContext