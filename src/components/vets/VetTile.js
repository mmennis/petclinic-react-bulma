import React from 'react'
import PropTypes from 'prop-types'
import { Tile, Card, Content, Heading, Button } from 'react-bulma-components'
import EditVetForm from './EditVetForm'
import axios from 'axios'
import { data } from './vets.localisation.data'
import LocalizedStrings from 'react-localization'
import { LanguageContext } from '../localization/LanguageContext'

const strings = new LocalizedStrings(data)

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
        console.log(`Received updated vet data ${JSON.stringify(newVet)}`)
        axios.put(`${BASE_URL}/vets/${newVet._id}`, newVet)
            .then((response) => {
                console.log(`Response for vet update: ${response.data.msg}`)
            })
            .catch((err) => {
                console.error(`Problem with Vet update request: ${err}`)
            }).finally(() => {
                console.log('Update vet complete')
            })
    }

    handleDeleteVet = () => {
        this.props.handleDeleteVet(this.props.vet)
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.substring(1)
    }

    render() {
        const localeContext = this.context
        strings.setLanguage(localeContext.lang)
        return (
            <Tile size={3}>
                <Card paddingless={true} rounded="true" outlined="true">
                    <Card.Header outlined="true" >
                        <Card.Header.Title>{this.props.vet.first_name} {this.props.vet.last_name}</Card.Header.Title>
                    </Card.Header>
                    <Card.Content paddingless={false} color="light">
                        <Content size="medium">
                            <p>{this.capitalize(this.props.vet.specialty)}</p>
                        </Content>
                        <Content>
                            <Heading marginless={true} paddingless={false} size={6}>{strings.address_heading}</Heading>
                            <p>{this.props.vet.address}<br/>{this.props.vet.city}, {this.props.vet.state}</p>
                        </Content>
                        <Content size="small">
                            <p>{this.props.vet.telephone}</p>
                        </Content>
                        <Content size="small">
                            <p>{strings.hours}: {this.props.vet.office_hours}</p>
                        </Content>

                    </Card.Content>
                    <Card.Footer>
                        <EditVetForm 
                            vet={this.props.vet} 
                            handleVetUpdate={this.handleVetUpdate}
                            modal={{closeOnBlur: true, showClose: true }}
                        />
                        <Button 
                            onClick={this.handleDeleteVet} 
                            size="small" color="danger"
                            style={{ 'marginLeft': '10px', 'marginRight': '10px' }}>
                            {strings.delete_button}
                        </Button>
                    </Card.Footer>
                </Card>
            </Tile>
        )
    }
}

VetTile.contextType = LanguageContext

VetTile.propTypes = {
    vet: PropTypes.object.isRequired,
    handleDeleteVet: PropTypes.func.isRequired,
}