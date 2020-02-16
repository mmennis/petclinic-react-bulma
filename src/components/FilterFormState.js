import React from 'react'
import { Form, Button, Tile } from 'react-bulma-components'
import PropTypes from 'prop-types'

export default class FilterFormState extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stateFilter: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleChange = (e) => {
        this.setState({ stateFilter: e.target.value.trim() })
    }

    submitForm = (e) => {
        e.preventDefault()
        this.props.handleFilterUpdate(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm} data-testid="form">
                    <Form.Field>
                        <Tile kind="parent">
                            <Tile size={1}>
                                <Form.Label>State:</Form.Label>
                            </Tile>
                            <Tile size={3}>
                                <Form.Control>
                                    <Form.Input 
                                        name="stateFilter" 
                                        type="text" 
                                        onChange={this.handleChange} 
                                        value={this.state.stateFilter} 
                                        data-testid="input"
                                    />
                                </Form.Control>
                            </Tile>
                            <Tile size={1}>
                                <Form.Control>
                                    <Button type="submit" color="primary" onClick={this.submitForm}>Submit</Button>
                                </Form.Control>
                            </Tile>
                        </Tile>
                    </Form.Field>
                </form>
            </div>
        )
    }
}

FilterFormState.propTypes = {
    handleFilterUpdate: PropTypes.func.isRequired
}