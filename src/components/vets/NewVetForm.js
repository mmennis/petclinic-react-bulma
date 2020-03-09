import React from 'react'
import { Modal, Form, Button, Content, Heading } from 'react-bulma-components'
import PropTypes from 'prop-types'

const fieldStyle = {

}

const labelStyle = {

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
                errors.first_name = (value === '') ? 'First name must have a value' : null
                break
            case 'last_name':
                touched.last_name = true
                errors.last_name = (value === '') ? 'Last name must have a value' : null
                break
            case 'address':
                touched.address = true
                errors.address = (value === '') ? 'Street Addr. must have a value' : null
                break
            case 'city':
                touched.city = true
                errors.city = (value === '') ? 'City must have a value' : null
                break
            case 'state':
                touched.state = true
                errors.state = (value === '') ? 'State must have a value' : null
                break
            case 'specialty':
                touched.specialty = true
                errors.specialty = (value === '') ? 'Specialty must have a value' : null
                break
            case 'telephone':
                touched.telephone = true
                errors.telephone = (value === '') ? 'Telephone number must be present' : null
                break          
            case 'office_hours':
                touched.office_hours = true
                errors.office_hours = (value === '') ? 'Office Hours required' : null
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
        return (
            <div style={ { 'marginTop': '20px', 'marginLeft' : '25px' } }>
                <Button onClick={this.open} size="small" data-testid="modal-open" color="primary">
                    New Vet
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
                                    <Form.Label style={ labelStyle }>First name:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="first_name"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="First name"
                                            value={this.state.newVet.first_name}
                                            data-testid="first-name-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={ errorStyle } data-testid="first-name-error">{this.state.errors.first_name}</Form.Help>
                                </Form.Field>
                                <Form.Field style={ fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={ labelStyle }>Last name:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="last_name"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="Last name"
                                            value={this.state.newVet.last_name}
                                            data-testid="last-name-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="last-name-error">{this.state.errors.last_name}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>Specialty:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="specialty"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="Specialty"
                                            value={this.state.newVet.specialty}
                                            data-testid="specialty-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="specialty-error">{this.state.errors.specialty}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>Office Hours:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="office_hours"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="Hours"
                                            value={this.state.newVet.office_hours}
                                            data-testid="office-hours-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="office-hours-error">{this.state.errors.office_hours}</Form.Help>
                                </Form.Field>
                                <Heading size={3}>Home Address</Heading>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>Street:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="address"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="Street Address"
                                            value={this.state.newVet.address}
                                            data-testid="address-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="address-error">{this.state.errors.address}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>City:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="city"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="City"
                                            value={this.state.newVet.city}
                                            data-testid="city-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="city-error">{this.state.errors.city}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>State:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="state"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="State"
                                            value={this.state.newVet.state}
                                            data-testid="state-input"
                                        />
                                    </Form.Control>
                                    <Form.Help color="danger" style={errorStyle} data-testid="state-error">{this.state.errors.state}</Form.Help>
                                </Form.Field>
                                <Form.Field style={fieldStyle} marginless={false} horizontal={true}>
                                    <Form.Label style={labelStyle}>Telephone:</Form.Label>
                                    <Form.Control>
                                        <Form.Input 
                                            name="telephone"
                                            onChange={this.handleFieldChange}
                                            type="text"
                                            placeholder="Phone"
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
                                Add Vet
                            </Button>
                            <Button type="cancel" onClick={this.close} size="small" color="warning" data-testid="cancel-button">
                                Cancel
                            </Button>
                        </Modal.Card.Foot>
                    </Modal.Card>
                </Modal>
                </form>
            </div>
        )
    }

}

NewVetForm.propTypes = {
    modal: PropTypes.object,
    handleNewVet: PropTypes.func.isRequired,
}