import React from 'react'
import { Modal, Form, Button, Content, Heading } from 'react-bulma-components'
import PropTypes from 'prop-types'
import { data } from './vets.localisation.data'
import LocalizedStrings from 'react-localization'
import { LanguageContext } from '../localization/LanguageContext'

const strings = new LocalizedStrings(data)

const fieldStyle = {
}

const labelStyle = {
    'width': '20%',
    'marginBottom': '0'
}

const errorStyle = {

}
const resetTouched = {
    last_name: false,
    first_name: false,
    specialty: false,
    address: false,
    city: false,
    state: false,
    telephone: false,
    office_hours: false,
}

export default class NewVetForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            newVet: {},
            errors: {},
            touched: { ...resetTouched },
            incomplete: true
        }

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.validateFieldData = this.validateFieldData.bind(this)
        this.isIncomplete = this.isIncomplete.bind(this)
    }

    open = () => this.setState({ show: true })
    close = () => this.setState({ show: false, newVet: {}, errors: {}, touched: {...resetTouched}, incomplete: true })

    handleSubmit = () => {
        if (!this.isIncomplete()) {
            this.props.handleNewVet(this.state.newVet)
            this.close()
        } else {
            console.error('This should be unreachable')
        }
    }

    handleFieldChange = (e) => {
        const { name, value } = e.target
        const vetData = { ...this.state.newVet }
        vetData[name] = value
        this.setState({
            newVet: { ...vetData }
        }, () => {
            this.validateFieldData(name, value)
        })
    }

    validateFieldData = (name, value) => {
        const errors = this.state.errors
        const touched = this.state.touched
        switch(name) {
            case 'first_name':
                touched.first_name = true
                errors.first_name = (value === '') ? strings.errors.first_name : null
                break
            case 'last_name':
                touched.last_name = true
                errors.last_name = (value === '') ? strings.errors.last_name : null
                break
            case 'address':
                touched.address = true
                errors.address = (value === '') ? strings.errors.address : null
                break
            case 'city':
                touched.city = true
                errors.city = (value === '') ? strings.errors.city : null
                break
            case 'state':
                touched.state = true
                errors.state = (value === '') ? strings.errors.state : null
                break
            case 'specialty':
                touched.specialty = true
                errors.specialty = (value === '') ? strings.errors.specialty : null
                break
            case 'telephone':
                touched.telephone = true
                errors.telephone = (value === '') ? strings.errors.telephone : null
                break          
            case 'office_hours':
                touched.office_hours = true
                errors.office_hours = (value === '') ? strings.errors.office_hours : null
                break      
            default:
                console.log(`Unrecognized field ${name}`)
                break
        }
        this.setState({ 
            errors, 
            touched,
        })
        this.setState({
            incomplete: this.isIncomplete()
        })
        //console.log(`After updating ${name} incomplete is ${this.state.incomplete}`)
    }

    isIncomplete = () => {
        
        if (Object.keys(this.state.touched).every(x => this.state.touched[x])) {
            return (Object.keys(this.state.errors).some(x => this.state.errors[x])) 
        }
        return true
    }

    render() {
        let localeContext = this.context
        strings.setLanguage(localeContext.lang)
        return (
            <div style={ { 'marginTop': '20px', 'marginLeft' : '25px' } }>
                <Button onClick={this.open} size="small" data-testid="modal-open" color="primary">
                    {strings.new_vet_button}
                </Button>
                <form onSubmit={this.handleSubmit} data-testid="form">
                <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                    <Modal.Card>
                        <Modal.Card.Head onClose={this.close}>
                            <Modal.Card.Title>Create A New Vet ...</Modal.Card.Title>
                        </Modal.Card.Head>
                        <Modal.Card.Body>
                            <Content>
                                <Form.Field horizontal={true} marginless={false} style={ fieldStyle }>
                                    <Form.Label style={ labelStyle }>{strings.fields.first_name}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="first_name"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.first_name}
                                            value={this.state.newVet.first_name}
                                            data-testid="first-name-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={ errorStyle } data-testid="first-name-error">{this.state.errors.first_name}</Form.Help>
                                </Form.Field>
                                <Form.Field style={ fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={ labelStyle }>{strings.fields.last_name}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="last_name"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.last_name}
                                            value={this.state.newVet.last_name}
                                            data-testid="last-name-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="last-name-error">{this.state.errors.last_name}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>{strings.fields.specialty}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="specialty"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.specialty}
                                            value={this.state.newVet.specialty}
                                            data-testid="specialty-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="specialty-error">{this.state.errors.specialty}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>{strings.fields.office_hours}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="office_hours"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.office_hours}
                                            value={this.state.newVet.office_hours}
                                            data-testid="office-hours-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="office-hours-error">{this.state.errors.office_hours}</Form.Help>
                                </Form.Field>
                                <Heading size={3}>{strings.address_heading}</Heading>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>{strings.fields.address}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="address"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.address}
                                            value={this.state.newVet.address}
                                            data-testid="address-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="address-error">{this.state.errors.address}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>{strings.fields.city}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="city"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.city}
                                            value={this.state.newVet.city}
                                            data-testid="city-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="city-error">{this.state.errors.city}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>{strings.fields.state}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="state"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.state}
                                            value={this.state.newVet.state}
                                            data-testid="state-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="state-error">{this.state.errors.state}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>{strings.fields.telephone}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="telephone"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder={strings.fields.telephone}
                                            value={this.state.newVet.telephone}
                                            data-testid="telephone-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="telephone-error">{this.state.errors.telephone}</Form.Help>
                                </Form.Field>                                
                            </Content>
                        </Modal.Card.Body>
                        <Modal.Card.Foot>
                            <Button type="submit" onClick={this.handleSubmit} size="small" color="primary" disabled={this.state.incomplete} data-testid="add-vet-button">
                                {strings.add_button}
                            </Button>
                            <Button type="cancel" onClick={this.close} size="small" color="warning" data-testid="cancel-button">
                                {strings.cancel_button}
                            </Button>
                        </Modal.Card.Foot>
                    </Modal.Card>
                </Modal>
                </form>
            </div>
        )
    }

}

NewVetForm.contextType = LanguageContext

NewVetForm.propTypes = {
    modal: PropTypes.object,
    handleNewVet: PropTypes.func.isRequired,
}