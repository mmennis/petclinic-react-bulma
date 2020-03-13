/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React from 'react'
import axios from 'axios'
import OwnerGrid from './OwnerGrid'
import { Section, Pagination } from 'react-bulma-components'
import FilterFormState from '../FilterFormState'
import NewOwnerForm from './NewOwnerForm'

const BASE_URL = process.env.REACT_APP_PETCLINIC_APP_API_ENDPOINT;
const OWNERS_PER_PAGE = 20;

export default class Owners extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            owners: [],
            filteredOwners: [],
            currentPage: 1,
            totalPages: 0,
        }

        this.onClick = this.onClick.bind(this)
        this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
    }

    

    componentDidMount() {
        axios.get(BASE_URL + '/owners')
            .then((response) => {
                const owners = response.data.data;
                console.log(owners[0])
                this.setState({ 
                    owners,
                    totalPages: owners.length/OWNERS_PER_PAGE,
                    filteredOwners: owners
                 })
            })
            .catch((error) => {
                console.error(`Problem retrieving owners data from backend ${error}`);
            })
            .finally(() => {
                console.log('Owners data request complete');
            })
    }

    handleFilterUpdate = (formModel) => {
        this.setState({
            ...formModel 
        }, () => {
            const fOwners = ((this.state.stateFilter) ? 
                this.state.owners.filter(owner => owner.state.startsWith(this.state.stateFilter) ) : 
                this.state.owners)
            this.setState({ 
                filteredOwners: fOwners,
                totalPages: Math.ceil(fOwners.length/OWNERS_PER_PAGE),
                currentPage: 1,
            }) 
        })

    }

    handleNewOwner = (newOwner) => {
        axios.post(BASE_URL + '/owners', newOwner)
            .then((response) => {
                if (response.status === 201) {
                    console.log(`Add owner message: ${response.data.msg}`)
                    newOwner._id = response.data.id
                    newOwner.pets = []
                    this.setState({
                        owners: [...this.state.owners, newOwner]
                    })
                }
            })
            .catch((error) => {
                console.error(`Problem adding new owner to backend DB ${error}`)
            })
            .finally(() => {
                console.log('New owner added to the backend')
            })
    }

    render() {
        this.state.filteredOwners.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1)

        let startIndex = (this.state.currentPage - 1) * OWNERS_PER_PAGE
        let gridOwners = this.state.filteredOwners.slice(startIndex, startIndex + OWNERS_PER_PAGE)
        return (
            <Section paddingless={false} style={{'paddingTop': '15px',}}>
                <FilterFormState handleFilterUpdate={this.handleFilterUpdate} />
                <Pagination 
                    current={this.state.currentPage} 
                    total={this.state.totalPages} 
                    delta={3}
                    onChange={this.onClick}
                    size="small"
                />
                <NewOwnerForm handleNewOwner={this.handleNewOwner} modal={{closeOnBlur: true, showClose: true }} />
                <OwnerGrid 
                    owners={gridOwners} 
                />
            </Section>
        )
    }

    onClick(pageNumber) {
        this.setState({ currentPage: pageNumber})
    }

}