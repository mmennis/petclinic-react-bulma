import React from 'react'
import { Modal, Form, Button } from 'react-bulma-components'
import PropTypes from 'prop-types'

export default class NewVetForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            newVet: {},
            errors: {},
        }

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open = () => this.setState({ show: true })
    close = () => this.setState({ show: false })

    onSubmit = () => {
        this.props.handleNewVet(this.state.newVet)
        this.close()
    }

    render() {
        return (
            <div>
                <Button onClick={this.open} size="small" data-testid="modal-open" color="primary">
                    New Vet
                </Button>
                <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                    <Modal.Card>
                        <Modal.Card.Head onClose={this.close}>
                            <Modal.Card.Title>Create A New Vet ...</Modal.Card.Title>
                        </Modal.Card.Head>
                    </Modal.Card>
                </Modal>
            </div>
        )
    }

}

NewVetForm.propTypes = {
    modal: PropTypes.object,
    handleNewVet: PropTypes.func.isRequired,
}