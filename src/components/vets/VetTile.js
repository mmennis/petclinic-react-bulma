import React from 'react'
import PropTypes from 'prop-types'
import { Tile, Card, Content, Heading } from 'react-bulma-components'

export default class VetTile extends React.Component {

    render() {
        return (
            <Tile size={3}>
                <Card paddingless={true} rounded="true" outlined="true">
                    <Card.Header outlined="true">
                        <Card.Header.Title>{this.props.vet.first_name} {this.props.vet.last_name}</Card.Header.Title>
                    </Card.Header>
                    <Card.Content paddingless={false} color="light">
                        <Content size="small">
                            <Heading size={6} marginless={true}>Office Hours</Heading>
                            <p>{this.props.vet.office_hours}</p>
                        </Content>
                        <Content>
                            <Heading marginless={true} paddingless={false} size={6}>Address</Heading>
                            <p>{this.props.vet.address}<br/>{this.props.vet.city}, {this.props.vet.state}</p>
                        </Content>
                        <Content size="small">
                            <Heading marginless={true} paddingless={false} size={6}>Phone:</Heading >
                            <p>{this.props.vet.telephone}</p>
                        </Content>
                    </Card.Content>
                </Card>
            </Tile>
        )
    }
}

VetTile.propTypes = {
    vet: PropTypes.object.isRequired
}