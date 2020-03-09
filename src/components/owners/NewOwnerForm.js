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
    first_name: false,
    last_name: false,
    address: false,
    city: false,
    state: false,
    telephone: false
}

export default class NewOwnerForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            newOwner: {},
            errors: {},
            touched: {...resetTouched},
            incomplete: true
        }

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open = () => this.setState({ show: true })
    close = () => this.setState({ show: false, newVet: {}, errors: {}, touched: {...resetTouched}, incomplete: true })

    render() {
        return (
            <div>
                <Button onClick={this.open} size="small" data-testid="modal-open" color="primary">
                    New Owner
                </Button>
                <form data-testid="form">
                    <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                        <Modal.Card>
                            
                        </Modal.Card>
                    </Modal>
                </form>
            </div>
        )
    }
}

NewOwnerForm.propTypes = {
    modal: PropTypes.object,
    handleNewOwner: PropTypes.func.isRequired
}