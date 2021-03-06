import React from 'react'
import PropTypes from 'prop-types'
import VetRowTile from './VetRowTile'
import { Section, Box, Tile } from 'react-bulma-components'

export default class VetGrid extends React.Component {

    constructor(props) {
        super(props)
        this.createGrid = this.createGrid.bind(this)
    }

    createGrid = () => {
        let grid = []
        let i, j
        const rowSize = 4
        for (i = 0, j=this.props.vets.length; i < j; i += rowSize) {
            let rowVets = this.props.vets.slice(i, i+rowSize)
            grid.push(
                <VetRowTile vets={rowVets} key={i} handleDeleteVet={this.props.handleDeleteVet} />
            )
        }
        return grid
    }

    render() {
        return (
            <Section style={{ "paddingTop": '15px'}}>
                <Box>
                    <Tile kind="ancestor" vertical>
                        {this.createGrid()}
                    </Tile>
                </Box>
            </Section>
        )
    }

}

VetGrid.propTypes = {
    vets: PropTypes.array.isRequired,
    handleDeleteVet: PropTypes.func.isRequired
}