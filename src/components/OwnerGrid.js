import React from 'react';
import OwnerRowTile from './OwnerRowTile'
import { Section, Box, Tile } from 'react-bulma-components'
import PropTypes from 'prop-types'

export default class OwnerGrid extends React.Component {

    constructor() {
        super()
        this.createGrid = this.createGrid.bind(this)
    }


    render() {
        
        return(
            <Section>
                <Box>
                    <Tile kind="ancestor" vertical>
                        {this.createGrid()}
                    </Tile>    
                </Box>
            </Section>
        )
    }

    createGrid = () => {
        let grid = []
        let i, j
        const rowSize = 4
        for (i=0, j=this.props.owners.length; i < j; i+=rowSize) {
            let rowOwners = this.props.owners.slice(i, i+rowSize)
            grid.push(
                <OwnerRowTile owners={rowOwners} />
            )
        }
        return grid
    }

}

OwnerGrid.propTypes = {
    owners: PropTypes.array.isRequired
}