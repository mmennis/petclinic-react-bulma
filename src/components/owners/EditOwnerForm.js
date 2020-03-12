import React from 'react'
import { Button, Modal, Form, Heading, Content } from 'react-bulma-components'
import PropTypes from 'prop-types'
import { data } from './owers.localisation.data'
import LocalizedStrings from 'react-localization'
import { LanguageContext } from '../localization/LanguageContext'

const strings = new LocalizedStrings(data)

const labelStyle = {
    'width': '20%'
}

const errorStyle = {
    'marginLeft': '15px'
}

export default class EditOwnerForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            errors: {},
            owner: { ...props.owner },
            hasErrors: false,
        }
    }

    open = () => this.setState({ show: true })
    close = () => this.setState({ show: false, owner: {...this.props.owner}, errors: {}, hasErrors: false })

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleOwnerUpdate(this.state.owner)
        this.close()
    }

    handleFieldChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        const newOwner = {
            ...this.state.owner
        }
        newOwner[name] = value
        this.setState({
            owner: {
                ...newOwner
            }
        }, () => {
            this.validateFieldData(name, value)
        })
    }

    validateFieldData = (name, value) => {
        const errors = this.state.errors
        switch(name) {
            case 'first_name': 
                errors.first_name = (value === '') ? strings.errors.first_name : null
                break
            case 'last_name': 
                errors.last_name = (value === '') ? strings.errors.last_name : null
                break
            case 'address':
                errors.address = (value === '') ? strings.errors.address : null
                break
            case 'city':
                errors.city = (value === '') ? strings.errors.city : null
                break
            case 'state':
                errors.state = (value === '') ? strings.errors.state : null
                break
            default:
                console.log(`Unrecognized field "${name}"`)
                break
        }
        this.setState({
            errors,
            hasErrors: (Object.keys(this.state.errors).some(x => this.state.errors[x]))
        })
    }

    render() {
        const localeContext = this.context
        strings.setLanguage(localeContext.lang)
        return (
            <div>
                <Button onClick={this.open} size="small" data-testid="modal-open">{strings.edit_button}</Button>
                <form onSubmit={this.handleSubmit} data-testid="form">
                    <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                        <Modal.Card>
                            <Modal.Card.Head onClose={this.close}>
                                <Modal.Card.Title>{this.state.owner.first_name} {this.state.owner.last_name}</Modal.Card.Title>
                            </Modal.Card.Head>
                            <Modal.Card.Body>
                                <Content>
                                    <Form.Field horizontal={true} marginless={true}>
                                        <Form.Label style={labelStyle}>{strings.fields.first_name}</Form.Label>
                                        <Form.Control>
                                            <Form.Input 
                                                name="first_name"
                                                type="text"
                                                placeholder={strings.fields.first_name}
                                                value={this.state.owner.first_name}
                                                onChange={this.handleFieldChange}
                                                data-testid="first-name-input"
                                            />
                                        </Form.Control>
                                        <Form.Help color="danger" style={errorStyle}>{this.state.errors.first_name}</Form.Help>
                                    </Form.Field>
                                    <Form.Field horizontal={true} marginless={true}>
                                        <Form.Label style={labelStyle}>{strings.fields.last_name}</Form.Label>
                                        <Form.Control>
                                            <Form.Input 
                                                name="last_name"
                                                type="text"
                                                placeholder={strings.fields.last_name}
                                                value={this.state.owner.last_name}
                                                onChange={this.handleFieldChange}
                                                data-testid="last-name-input"
                                            />
                                        </Form.Control>
                                        <Form.Help color="danger" style={errorStyle}>{this.state.errors.last_name}</Form.Help>
                                    </Form.Field>
                                </Content>
                                <Content>
                                    <Heading size={4}>{strings.address_heading}</Heading>
                                    <Form.Field horizontal={true} marginless={true}>
                                        <Form.Label style={labelStyle}>{strings.fields.address}</Form.Label>
                                        <Form.Control>
                                            <Form.Input 
                                                name="address"
                                                type="text"
                                                placeholder={strings.fields.address}
                                                value={this.state.owner.address}
                                                onChange={this.handleFieldChange}
                                                data-testid="adddress-input"
                                            />
                                        </Form.Control>
                                        <Form.Help color="danger" style={errorStyle}>{this.state.errors.address}</Form.Help>
                                    </Form.Field>
                                    <Form.Field horizontal={true} marginless={true}>
                                        <Form.Label style={labelStyle}>{strings.fields.city}</Form.Label>
                                        <Form.Control>
                                            <Form.Input 
                                                name="city"
                                                type="text"
                                                placeholder={strings.fields.city}
                                                value={this.state.owner.city}
                                                onChange={this.handleFieldChange}
                                                data-testid="city-input"
                                            />
                                        </Form.Control>
                                        <Form.Help color="danger" style={errorStyle}>{this.state.errors.city}</Form.Help>
                                    </Form.Field>
                                    <Form.Field horizontal={true} marginless={true}>
                                        <Form.Label style={labelStyle}>{strings.fields.state}</Form.Label>
                                        <Form.Control>
                                            <Form.Input 
                                                name="state"
                                                type="text"
                                                placeholder={strings.fields.state}
                                                value={this.state.owner.state}
                                                onChange={this.handleFieldChange}
                                                data-testid="state-input"
                                            />
                                        </Form.Control>
                                        <Form.Help color="danger" style={errorStyle}>{this.state.errors.state}</Form.Help>
                                    </Form.Field>
                                </Content>
                            </Modal.Card.Body>
                            <Modal.Card.Foot>
                                <Button type="submit" color="success" size="small" 
                                    onClick={this.handleSubmit} data-testid="edit-button" 
                                    rounded={true} disabled={this.state.hasErrors}>
                                        {strings.edit_button}
                                </Button>
                                <Button type="cancel" color="danger" size="small" onClick={this.close} data-testid="cancel-button" rounded={true}>
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

EditOwnerForm.contextType = LanguageContext

EditOwnerForm.propTypes = {
    owner: PropTypes.object.isRequired,
    modal: PropTypes.object,
    handleOwnerUpdate: PropTypes.func.isRequired
}