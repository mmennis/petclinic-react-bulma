/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React from 'react'
import axios from 'axios'
import OwnerGrid from './OwnerGrid'
import { Section, Pagination } from 'react-bulma-components'

const BASE_URL = process.env.REACT_APP_PETCLINIC_APP_API_ENDPOINT;
const OWNERS_PER_PAGE = 20;

export default class Owners extends React.Component {

    constructor() {
        super()
        this.onClick = this.onClick.bind(this)
    }

    state = {
        owners: [],
        currentPage: 1,
        totalPages: 0
    }

    componentDidMount() {
        axios.get(BASE_URL + '/owners')
            .then((response) => {
                const owners = response.data.data;
                this.setState({ owners });
                this.setState({ totalPages: owners.length/OWNERS_PER_PAGE })
            })
            .catch((error) => {
                console.error(`Problem retrieving owners data from backend ${error}`);
            })
            .finally(() => {
                console.log('Owners data request complete');
            })
    }

    render() {
        this.state.owners.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1)
        let startIndex = (this.state.currentPage - 1) * OWNERS_PER_PAGE
        let gridOwners = this.state.owners.slice(startIndex, startIndex + OWNERS_PER_PAGE)
        return (
            <Section>
                <Pagination 
                    current={this.state.currentPage} 
                    total={this.state.totalPages} 
                    delta={3}
                    onChange={this.onClick}
                />
                <OwnerGrid 
                    owners={gridOwners} 
                />
            </Section>
        )
    }

    onClick(pageNumber) {
        console.log(`The currentPage is ${pageNumber}`)
        this.setState({ currentPage: pageNumber})
    }

}