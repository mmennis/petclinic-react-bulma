import React from 'react'
import PropTypes from 'prop-types'
import { Tile, Card, Content, Heading } from 'react-bulma-components'
import EditVetForm from './EditVetForm'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_PETCLINIC_APP_API_ENDPOINT;

export default class VetTile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            updated: false
        }
        this.handleVetUpdate = this.handleVetUpdate.bind(this)
    }

    handleVetUpdate = (newVet) => {
        console.log(`Received updated vet data ${newVet}`)
        console.log(`Id is: ${newVet._id}`)
        axios.put(`${BASE_URL}/vets/${newVet._id}`, newVet)
            .then((response) => {
                console.log(`Response for vet update: ${response}`)
            })
            .catch((err) => {
                console.error(`Problem with Vet update request: ${err}`)
            }).finally(() => {
                console.log('Update vet complete')
            })
    }

    render() {
        return (
            <Tile size={3}>
                <Card paddingless={true} rounded="true" outlined="true">
                    <Card.Header outlined="true" >
                        <Card.Header.Title>{this.props.vet.first_name} {this.props.vet.last_name}</Card.Header.Title>
                    </Card.Header>
                    <Card.Content paddingless={false} color="light">
                        <Content size="medium">
                            <p>{this.props.vet.specialty}</p>
                        </Content>
                        <Content>
                            <Heading marginless={true} paddingless={false} size={6}>Address</Heading>
                            <p>{this.props.vet.address}<br/>{this.props.vet.city}, {this.props.vet.state}</p>
                        </Content>
                        <Content size="small">
                            <p>{this.props.vet.telephone}</p>
                        </Content>
                        <Content size="small">
                            <p>Hours: {this.props.vet.office_hours}</p>
                        </Content>
                        <EditVetForm 
                            vet={this.props.vet} 
                            handleVetUpdate={this.handleVetUpdate}
                            modal={{closeOnBlur: true, showClose: true }}
                        />
                    </Card.Content>
                </Card>
            </Tile>
        )
    }
}

VetTile.propTypes = {
    vet: PropTypes.object.isRequired
}