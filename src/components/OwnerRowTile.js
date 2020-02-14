import React from 'react'
import { Tile } from 'react-bulma-components'
import PropTypes from 'prop-types'
import OwnerTile from './OwnerTile'

export default class OwnerRowTile extends React.Component {

    constructor() {
        super()
        this.createRow = this.createRow.bind(this)
    }

    render() {
        return (
            <Tile kind="parent" color="primary">
                {
                this.createRow()
                }
            </Tile>
        )
    }

    createRow = () => {
        let list = []
        this.props.owners.map((owner, ownerId) => {
            list.push(
                <OwnerTile key={ownerId} owner={owner} />
            )
        })
        return list
    }

}

OwnerRowTile.propTypes = {
    owners: PropTypes.object.isRequired
}