import React from 'react'
import axios from 'axios'
import VetGrid from './VetGrid'
import { Section, Pagination } from 'react-bulma-components'
import FilterFormState from '../FilterFormState'

const BASE_URL = process.env.REACT_APP_PETCLINIC_APP_API_ENDPOINT;
const VETS_PER_PAGE = 20;

export default class Vets extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            vets: [],
            filteredVets: [],
            currentPage: 1,
            totalPages: 0
        }

        this.onClick = this.onClick.bind(this)
        this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
    }


    handleFilterUpdate = (formModel) => {
        this.setState({
            ...formModel
        },() => {
            const fVets = ((this.state.stateFilter) ?
                this.state.vets.filter(vet => vet.state.startsWith(this.state.stateFilter)):
                this.state.vets
            )
            console.log(`Filtered vets count is ${fVets.length}`)
            console.log(`New totalPage count is ${Math.ceil(fVets.length/VETS_PER_PAGE)}`)
            this.setState({
                filteredVets: fVets,
                totalPages: Math.ceil(fVets.length/VETS_PER_PAGE)
            })
        })
    }

    onClick = (pageNumber) => {
        this.setState({ currentPage: pageNumber})
    }

    componentDidMount() {
        axios.get(BASE_URL + '/vets')
            .then((response) => {
                const vets = response.data.data
                console.log(vets[0])
                this.setState({
                    vets,
                    totalPages: Math.ceil(vets.length/VETS_PER_PAGE),
                    filteredVets: vets,
                })
            })
            .catch((error) => {
                console.error(`Problem loading vets data from backend: ${error}`)
            })
            .finally(() => {
                console.log(`Vets data request completed`)
            })
    }

    render() {
        this.state.filteredVets.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1)
            
        let startIndex = (this.state.currentPage - 1) * VETS_PER_PAGE
        let gridVets = this.state.filteredVets.slice(startIndex, startIndex + VETS_PER_PAGE)

        return (
            <Section paddingless={false} style={{'paddingTop': '15px',}}>
                <FilterFormState handleFilterUpdate={this.handleFilterUpdate} />
                <Pagination 
                    current={this.state.currentPage}
                    total={this.state.totalPages}
                    delta={3}
                    onChange={this.onClick}
                />
                <VetGrid 
                    vets={gridVets}
                />
            </Section>
        )
    }


}