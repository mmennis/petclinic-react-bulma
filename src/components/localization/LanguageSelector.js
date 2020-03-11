import React from 'react'
import { LanguageContext } from './LanguageContext'

export default class LanguageSelector extends React.Component {


    render() {
        return(
            <LanguageContext.Consumer>
                { value => (
                    <select defaultValue={value.lang} onChange={value.updateLocale}>
                        <option value="en">
                            English
                        </option>
                        <option value="es">
                            Espanol
                        </option>
                        <option value="fr">
                            Francais
                        </option>
                    </select>
                )}
            </LanguageContext.Consumer>
        )
    }
}