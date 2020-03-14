import React from 'react'
import { Tile, Heading, Content, Card, Button } from 'react-bulma-components'
import PropTypes from 'prop-types'
import OwnersDetail from './OwnersDetail'
import EditOwnerForm from './EditOwnerForm' 
import Pluralize from 'react-pluralize'
import axios from 'axios'
import { data } from './owers.localisation.data'
import LocalizedStrings from 'react-localization'
import { LanguageContext } from '../localization/LanguageContext'

const strings = new LocalizedStrings(data)

const BASE_URL = process.env.REACT_APP_PETCLINIC_APP_API_ENDPOINT;

export default class OwnerTile extends React.Component {

    constructor(props) {
        super(props)

        this.state ={
            updated: false
        }
        this.handleOwnerUpdate = this.handleOwnerUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleOwnerUpdate = (owner) => {
        console.log(`Received an updated owner: ${JSON.stringify(owner)}`)
        axios.put(`${BASE_URL}/owners/${owner._id}`, owner)
            .then((response) => {
                console.log(`Response from owner update: ${JSON.stringify(response)}`)
            })
            .catch((err) => {
                console.error(`Problem updating owner: ${err}`)
            })
            .finally(() => {
                console.log(`Owner ${owner._id} updated`)
            })
    }

    handleDelete = () => {
        this.props.handleDeleteOwner(this.props.owner)
    }

    render() {
        const localeCtx = this.context
        strings.setLanguage(localeCtx.lang)
        return (
            <Tile size={3} renderAs="article" kind="child" notification color="light" style={{ 'padding': '10px 20px 10px 20px'}}paddingless={false} key={this.props.owner._id}>
                <Card paddingless={true} rounded="true" outlined="true" >
                    <Card.Header outlined="true" >
                        <Card.Header.Title>{this.props.owner.first_name} {this.props.owner.last_name}</Card.Header.Title>
                    </Card.Header>
                    <Card.Content paddingless={false} color="light">            
                        <Content size="small">
                            <p>{this.props.owner.city}, {this.props.owner.state}</p>
                        </Content>
                        <Heading size={4} subtitle><Pluralize singular={'pet'} count={this.props.owner.pets.length}/></Heading>
                    </Card.Content>
                    <Card.Footer>
                        <OwnersDetail owner={this.props.owner} modal={{closeOnBlur: true, showClose: true }}/>
                        <EditOwnerForm 
                            owner={this.props.owner} 
                            handleOwnerUpdate={this.handleOwnerUpdate} 
                            modal={{closeOnBlur: true, showClose: true }}
                        />
                        <Button 
                            onClick={this.handleDelete}
                            color="danger" size="small"
                            data-testid="delete-button"
                            rounded={true}
                        >
                            {strings.delete_button}
                        </Button>
                    </Card.Footer>
                </Card>                
            </Tile>
        )
    }

}

OwnerTile.contextType = LanguageContext

OwnerTile.propTypes = {
    owner: PropTypes.object.isRequired,
    handleDeleteOwner: PropTypes.func.isRequired,
}