import React from 'react'
import { Button, Modal, Form, Media, Image, Content, Heading } from 'react-bulma-components'
import PropTypes from 'prop-types'


const fieldStyle = {
    "marginRight": "20px", 
    "marginTop": "8px"
}


export default class EditVetForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            _id: this.props.vet._id,
            first_name: this.props.vet.first_name,
            last_name: this.props.vet.last_name,
            address: this.props.vet.address,
            city: this.props.vet.city,
            state: this.props.vet.state,
            office_hours: this.props.vet.office_hours,
            telephone: this.props.vet.telephone,
            specialty: this.props.vet.specialty,
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
        this.props.handleVetUpdate(this.state)
        this.close()
    }

    handleFieldChange = (e) => {
        console.log(`Updating ${e.target.name} to ${e.target.value}`)
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value,
        }, () => {
            this.validateFieldData(name, value)
        })
    }

    validateFieldData = (name, value) => {
        console.log(`Checking field ${name} with value ${value}`)
        if( value === '') {
            console.error('Problem detected')
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.open} size="small">Edit</Button>
                <form onSubmit={this.handleSubmit} data-testid="form">
                    <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                        <Modal.Card>
                            <Modal.Card.Head onClose={this.close}>
                                <Modal.Card.Title>{this.props.vet.first_name} {this.props.vet.last_name}</Modal.Card.Title>
                            </Modal.Card.Head>
                            <Modal.Card.Body>
                                <Form.Field horizontal={true}>
                                    <Form.Label style={ fieldStyle }>First Name</Form.Label>
                                    <Form.Control>
                                    <Form.Input 
                                        type="text" 
                                        name="first_name"
                                        placeholder="first_name"
                                        value={this.state.first_name} 
                                        onChange={this.handleFieldChange}
                                        data-testid="first-name-input"
                                    />
                                </Form.Control>
                                </Form.Field>
                                <Form.Field horizontal={true}>
                                    <Form.Label style={ fieldStyle }>Last Name</Form.Label>
                                    <Form.Control>
                                    <Form.Input 
                                        type="text" 
                                        name="last_name"
                                        placeholder="last_name" 
                                        value={this.state.last_name}
                                        onChange={this.handleFieldChange}
                                        data-testid="last-name-input"
                                    />
                                </Form.Control>
                                </Form.Field>    
                                <Content>
                                    <Media>
                                        <Media.Item renderAs="figure" position="left" marginless={true}>
                                            <Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png"/>
                                        </Media.Item>
                                        <Media.Item>
                                            <Content>
                                                <Heading size={5} marginless={true}>Address</Heading>
                                                <Form.Field horizontal={true} marginless={true}>
                                                    <Form.Label style={ {"marginRight": "20px", "marginTop": "8px"} }>Street</Form.Label>
                                                    <Form.Control>
                                                        <Form.Input 
                                                            type="text"
                                                            name="address"
                                                            placeholder="street address"
                                                            value={this.state.address}
                                                            onChange={this.handleFieldChange}
                                                            data-testid="address-input"
                                                        />
                                                    </Form.Control>
                                                </Form.Field>
                                                <Form.Field horizontal={true} marginless={true}>
                                                    <Form.Label style={ {"marginRight": "20px", "marginTop": "8px"} }>City</Form.Label>
                                                    <Form.Control>
                                                        <Form.Input 
                                                            type="text"
                                                            name="city"
                                                            placeholder="city"
                                                            value={this.state.city}
                                                            onChange={this.handleFieldChange}
                                                            data-testid="city-input"
                                                        />
                                                    </Form.Control>
                                                </Form.Field> 
                                                <Form.Field horizontal={true} marginless={true}>
                                                    <Form.Label style={{ "marginRight": "20px", "marginTop": "8px" }}>State</Form.Label>
                                                    <Form.Control>
                                                        <Form.Input 
                                                            type="text"
                                                            name="state"
                                                            placeholder="state"
                                                            value={this.state.state}
                                                            onChange={this.handleFieldChange}
                                                            data-testid="state-input"
                                                        />
                                                    </Form.Control>
                                                </Form.Field>
                                            </Content>
                                        </Media.Item>
                                    </Media>
                                </Content>                            
                                    <Content>
                                        <Form.Field horizontal={true} marginless={true}>
                                            <Form.Label style={fieldStyle}>Telephone</Form.Label>
                                            <Form.Control>
                                                <Form.Input 
                                                    type="text"
                                                    name="telephone"
                                                    placeholder="telephone"
                                                    value={this.state.telephone}
                                                    onChange={this.handleFieldChange}
                                                    data-testid="phone-input"
                                                />
                                            </Form.Control>
                                        </Form.Field>
                                        <Form.Field horizontal={true} marginless={true}>
                                            <Form.Label style={fieldStyle}>Office Hours</Form.Label>
                                            <Form.Control>
                                                <Form.Input 
                                                    type="text"
                                                    name="office_hours"
                                                    placeholder="office hours"
                                                    value={this.state.office_hours}
                                                    onChange={this.handleFieldChange}
                                                    data-testid="office-input"
                                                />
                                            </Form.Control>
                                        </Form.Field>
                                        <Form.Field horizontal={true} marginless={true}>
                                            <Form.Label style={fieldStyle}>Specialty</Form.Label>
                                            <Form.Control>
                                                <Form.Input 
                                                    type="text"
                                                    name="specialty"
                                                    placeholder="specialty"
                                                    value={this.state.specialty}
                                                    onChange={this.handleFieldChange}
                                                    data-testid="specialty-input"
                                                />
                                            </Form.Control>
                                        </Form.Field>
                                    </Content>
                                
                            </Modal.Card.Body>
                            <Modal.Card.Foot>
                                <Button type="submit" onClick={this.handleSubmit} size="small">Update Vet</Button>
                                <Button type="cancel" onClick={this.close} size="small">Cancel</Button>
                            </Modal.Card.Foot>
                        </Modal.Card>
                    </Modal>
                </form>
            </div>
        )
    }
}

EditVetForm.propTypes = {
    vet: PropTypes.object.isRequired,
    modal: PropTypes.object,
    handleVetUpdate: PropTypes.func.isRequired
}