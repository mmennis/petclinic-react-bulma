import React from 'react'
import { Button, Modal, Media, Image, Content, Heading } from 'react-bulma-components'
import PropTypes from 'prop-types'
import OwnerPetList from './OwnerPetList'

export default class OwnersDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    static defaultProps = {
        modal: {}
    }

    open = () => this.setState({ show: true })
    close = () => this.setState({ show: false })

    render() {

        return (
            <div>
                <Button onClick={this.open} size="small">Details</Button>
                <Modal show={this.state.show} onClose={this.close} {...this.props.modal} >
                    <Modal.Card>
                        <Modal.Card.Head onClose={this.close}>
                            <Modal.Card.Title>{this.props.owner.first_name} {this.props.owner.last_name}</Modal.Card.Title>
                        </Modal.Card.Head>
                        <Modal.Card.Body>
                            <Media>
                                <Media.Item renderAs="figure" position="left">
                                    <Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png"/>
                                </Media.Item>
                                <Media.Item>
                                    <Content>
                                        <Heading marginless={true} paddingless={false} size={6}>Address:</Heading>
                                        <p style={{ 'marginBottom': '5px'}}>{this.props.owner.address}<br/>{this.props.owner.city}, {this.props.owner.state}</p>
                                        <Heading marginless={true} paddingless={false} size={6}>Phone:  </Heading >
                                        <p>{this.props.owner.telephone}</p>
                                        <OwnerPetList owner={this.props.owner} />
                                    </Content>
                                </Media.Item>
                            </Media>
                        </Modal.Card.Body>
                        <Modal.Card.Foot>
                        </Modal.Card.Foot>
                    </Modal.Card>
                </Modal>
            </div>
        )
    }

}

OwnersDetail.propTypes = {
    owner: PropTypes.object.isRequired,
    modal: PropTypes.object
}