import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Pluralize from 'react-pluralize'
import { Box, List } from 'react-bulma-components'

const BASE_URL = process.env.REACT_APP_PETCLINIC_APP_API_ENDPOINT;

export default class OwnerPetList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pets: []
        }

        this.createPetList = this.createPetList.bind(this)
    }

    componentDidMount() {
        axios.get(BASE_URL + '/pets?owner=' + this.props.owner._id)
            .then((response) => {
                const pets = response.data.data
                console.log(pets)
                this.setState({
                    pets
                })
            })
            .catch((error) => {
                console.error(`Problem retrieving pets from server for owner ${this.props.owner._id}`)
            })
            .finally(() => {
                console.log(`Retrieved pets for owner ${this.props.owner._id}`)
            })
    }

    render() {

        return (
            <Box>
                <h6><Pluralize singular={'pet'} count={this.state.pets.length}/></h6>
                <List>
                    {
                        this.createPetList()
                    }
                </List>
            </Box>
            
        )
    }

    createPetList = () => {
        let list = []

        for (const pet of this.state.pets) {
            list.push(<List.Item key={pet._id}>{pet.name} a {pet.pet_type} aged {pet.age}</List.Item>)
        }
        return list
    }
}

OwnerPetList.propTypes = {
    owner: PropTypes.object.isRequired
}