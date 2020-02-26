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
        for (const owner of this.props.owners) {
            list.push(<OwnerTile key={owner._id} owner={owner} />)
        }
        return list
    }

}

OwnerRowTile.propTypes = {
    owners: PropTypes.array.isRequired
}