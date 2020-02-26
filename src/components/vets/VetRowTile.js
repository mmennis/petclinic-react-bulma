import React from 'react'
import PropTypes from 'prop-types'
import { Tile } from 'react-bulma-components'
import VetTile from './VetTile'

export default class VetRowTile extends React.Component {

    constructor(props) {
        super(props)
        this.createRow = this.createRow.bind(this)
    }

    createRow = () => {
        let list = []
        for (const vet of this.props.vets) {
            list.push(<VetTile key={vet._id} vet={vet} />)
        }
        return list
    }

    render() {
        return (
            <Tile kind="parent" color="primary">
                {this.createRow()}
            </Tile>
        )
    }
}

VetRowTile.propTypes = {
    vets: PropTypes.array.isRequired
}