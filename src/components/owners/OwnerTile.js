import React from 'react'
import { Tile, Heading, Content, Card } from 'react-bulma-components'
import PropTypes from 'prop-types'

export default class OwnerTile extends React.Component {

    render() {
        return (
            <Tile size={3} renderAs="article" kind="child" notification color="light" paddingless={true} key={this.props.owner._id}>
                <Card paddingless={true} rounded="true" outlined="true" >
                    <Card.Header outlined="true" >
                        <Card.Header.Title>{this.props.owner.first_name} {this.props.owner.last_name}</Card.Header.Title>
                    </Card.Header>
                    <Card.Content paddingless={false} color="light">            
                        <Heading size={6} subtitle>{this.props.owner.pets.length} pets</Heading>
                        <Content >
                            <Heading marginless={true} paddingless={false} size={6}>Address:</Heading>
                            <p>{this.props.owner.address}<br/>{this.props.owner.city}, {this.props.owner.state}</p>
                        </Content>
                        <Content size="small">
                            <Heading marginless={true} paddingless={false} size={6}>Phone:</Heading >
                            <p>{this.props.owner.telephone}</p>
                        </Content>
                    </Card.Content>
                </Card>                
            </Tile>
        )
    }

}

OwnerTile.propTypes = {
    owner: PropTypes.object.isRequired
}