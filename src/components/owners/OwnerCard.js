import React from 'react'
import { Card } from 'react-bulma-components'
import PropTypes from 'prop-types'

export default class OwnerCard extends React.Component {

    render() {
        return (
            <Card >
                <Card.Header color="primary">
                    {this.props.owner.first_name} {this.props.owner.last_name}
                </Card.Header>
                <Card.Content>
                    {this.props.owner.address}
                </Card.Content>
            </Card>
        )
    }
}

OwnerCard.propTypes = {
    owner: PropTypes.object.isRequired
}