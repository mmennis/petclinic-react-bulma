import React from 'react'
import { Button, Modal, Form, Media, Image, Content, Heading } from 'react-bulma-components'
import PropTypes from 'prop-types'
import { data } from './vets.localisation.data'
import LocalizedStrings from 'react-localization'
import { LanguageContext } from '../localization/LanguageContext'

const strings = new LocalizedStrings(data)


const fieldStyle = {
    "marginRight": "20px", 
    "marginTop": "8px",
    'width': '95px'
}

const errorStyle = {
    'marginLeft': '10px',
    'marginTop': '10px'
}

export default class EditVetForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            errors: {},
            vet: { ...props.vet }
        }

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
    }

    static defaultProps = {
        modal: {}
    }

    open = () => this.setState({ show: true })
    close = () => this.setState({ show: false })

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleVetUpdate(this.state.vet)
        this.close()
    }

    handleFieldChange = (e) => {
        const { name, value } = e.target
        const newVet = {
            ...this.state.vet
        }
        newVet[name] = value
        this.setState({
            vet: {
                ...newVet
            }
        }, () => {
            this.validateFieldData(name, value)
        })
    }

    validateFieldData = (name, value) => {
        const errors = this.state.errors
        switch (name) {
            case 'specialty':    
                errors.specialty = (value === '') ? strings.errors.specialty : null
                break
            case 'last_name':
                errors.last_name = (value === '') ? strings.errors.last_name : null
                break
            case 'first_name':
                errors.first_name = (value === '') ? strings.errors.first_name : null
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
            case 'telephone':
                errors.telephone = (value === '') ? strings.errors.telephone : null
                break
            case 'office_hours':
                errors.office_hours = (value === '') ? strings.errors.office_hours : null
                break
            default:
                break
        }
        this.setState({
            errors
        })
    }

    render() {
        let localeContext = this.context
        strings.setLanguage(localeContext.lang)
        return (
            <div>
                <Button 
                    onClick={this.open} 
                    size="small" color="primary" 
                    data-testid="modal-open"
                    style={{ 'marginLeft': '20px', 'marginRight': '10px' }}>
                        {strings.edit_button}
                </Button>
                <form onSubmit={this.handleSubmit} data-testid="form">
                    <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                        <Modal.Card>
                            <Modal.Card.Head onClose={this.close}>
                                <Modal.Card.Title >{this.props.vet.first_name} {this.props.vet.last_name}</Modal.Card.Title>
                            </Modal.Card.Head>
                            <Modal.Card.Body>
                                <Form.Field horizontal={true} marginless={true}>
                                    <Form.Label style={ fieldStyle }>{strings.fields.first_name}:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            type="text" 
                                            name="first_name"
                                            placeholder={strings.fields.first_name}
                                            value={this.state.vet.first_name} 
                                            onChange={this.handleFieldChange}
                                            data-testid="first-name-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle}>{this.state.errors.first_name}</Form.Help>
                                </Form.Field>
                                <Form.Field horizontal={true} marginless={true}>
                                    <Form.Label style={ fieldStyle }>{strings.fields.last_name}</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            type="text" 
                                            name="last_name"
                                            placeholder={strings.fields.last_name} 
                                            value={this.state.vet.last_name}
                                            onChange={this.handleFieldChange}
                                            data-testid="last-name-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle}>{this.state.errors.last_name}</Form.Help>
                                </Form.Field>    
                                <Content>
                                    <Media>
                                        <Media.Item renderAs="figure" position="left" marginless={true}>
                                            <Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png"/>
                                        </Media.Item>
                                        <Media.Item>
                                            <Content>
                                                <Heading size={5} marginless={true}>{strings.address_heading}</Heading>
                                                <Form.Field horizontal={true} marginless={true}>
                                                    <Form.Label style={ {"width": '50px',"marginRight": "20px", "marginTop": "8px"} }>{strings.fields.address}</Form.Label>
                                                    <Form.Control>
                                                        <Form.Input 
                                                            type="text"
                                                            name="address"
                                                            placeholder={strings.fields.address}
                                                            value={this.state.vet.address}
                                                            onChange={this.handleFieldChange}
                                                            data-testid="address-input"
                                                        />
                                                    </Form.Control>
                                                    <Form.Help color="danger" style={errorStyle}>{this.state.errors.address}</Form.Help>
                                                </Form.Field>
                                                <Form.Field horizontal={true} marginless={true}>
                                                    <Form.Label style={ {"width": '50px', "marginRight": "20px", "marginTop": "8px"} }>{strings.fields.city}</Form.Label>
                                                    <Form.Control>
                                                        <Form.Input 
                                                            type="text"
                                                            name="city"
                                                            placeholder={strings.fields.city}
                                                            value={this.state.vet.city}
                                                            onChange={this.handleFieldChange}
                                                            data-testid="city-input"
                                                        />
                                                    </Form.Control>
                                                    <Form.Help color="danger" style={errorStyle}>{this.state.errors.city}</Form.Help>
                                                </Form.Field> 
                                                <Form.Field horizontal={true} marginless={true}>
                                                    <Form.Label style={{ "width": '50px', "marginRight": "20px", "marginTop": "8px" }}>{strings.fields.state}</Form.Label>
                                                    <Form.Control>
                                                        <Form.Input 
                                                            type="text"
                                                            name="state"
                                                            placeholder={strings.fields.state}
                                                            value={this.state.vet.state}
                                                            onChange={this.handleFieldChange}
                                                            data-testid="state-input"
                                                        />
                                                    </Form.Control>
                                                    <Form.Help color="danger" style={errorStyle}>{this.state.errors.state}</Form.Help>
                                                </Form.Field>
                                            </Content>
                                        </Media.Item>
                                    </Media>
                                </Content>                            
                                    <Content>
                                        <Form.Field horizontal={true} marginless={true}>
                                            <Form.Label style={fieldStyle}>{strings.fields.telephone}</Form.Label>
                                            <Form.Control>
                                                <Form.Input 
                                                    type="text"
                                                    name="telephone"
                                                    placeholder={strings.fields.telephone}
                                                    value={this.state.vet.telephone}
                                                    onChange={this.handleFieldChange}
                                                    data-testid="phone-input"
                                                />
                                            </Form.Control>
                                            <Form.Help color="danger" style={errorStyle}>{this.state.errors.telephone}</Form.Help>
                                        </Form.Field>
                                        <Form.Field horizontal={true} marginless={true}>
                                            <Form.Label style={fieldStyle}>{strings.fields.office_hours}</Form.Label>
                                            <Form.Control>
                                                <Form.Input 
                                                    type="text"
                                                    name="office_hours"
                                                    placeholder={strings.fields.office_hours}
                                                    value={this.state.vet.office_hours}
                                                    onChange={this.handleFieldChange}
                                                    data-testid="office-input"
                                                />
                                            </Form.Control>
                                            <Form.Help color="danger" style={errorStyle}>{this.state.errors.office_hours}</Form.Help>
                                        </Form.Field>
                                        <Form.Field horizontal={true} marginless={true}>
                                            <Form.Label style={fieldStyle}>{strings.fields.specialty}</Form.Label>
                                            <Form.Control>
                                                <Form.Input 
                                                    type="text"
                                                    name="specialty"
                                                    placeholder={strings.fields.specialty}
                                                    value={this.state.vet.specialty}
                                                    onChange={this.handleFieldChange}
                                                    data-testid="specialty-input"
                                                />
                                            </Form.Control>
                                            <Form.Help color="danger" style={errorStyle}>{this.state.errors.specialty}</Form.Help>
                                        </Form.Field>
                                    </Content>
                                
                            </Modal.Card.Body>
                            <Modal.Card.Foot>
                                <Button type="submit" onClick={this.handleSubmit} size="small" color="success" rounded={true}>
                                    {strings.edit_button}
                                </Button>
                                <Button type="cancel" onClick={this.close} size="small" color="danger" rounded={true}>
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
EditVetForm.contextType = LanguageContext

EditVetForm.propTypes = {
    vet: PropTypes.object.isRequired,
    modal: PropTypes.object,
    handleVetUpdate: PropTypes.func.isRequired
}