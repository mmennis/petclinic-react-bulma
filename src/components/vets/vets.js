import React from 'react'
import axios from 'axios'
import VetGrid from './VetGrid'
import { Section, Pagination } from 'react-bulma-components'
import FilterFormState from '../FilterFormState'
import NewVetForm from './NewVetForm'

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
        this.handleNewVet = this.handleNewVet.bind(this)
        this.handleDeleteVet = this.handleDeleteVet.bind(this)
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
                totalPages: Math.ceil(fVets.length/VETS_PER_PAGE),
                currentPage: 1
            })
        })
    }

    handleNewVet = (newVet) => {
        axios.post(BASE_URL + '/vets', newVet)
            .then((res) => {
                if (res.status === 201) {
                    console.log(`Received response from server: ${JSON.stringify(res.data.msg)}`)
                    newVet._id = res.data.id
                    const updatedVets = [...this.state.vets, newVet]
                    this.setState({
                        vets: updatedVets,
                        filteredVets: updatedVets
                    })
                }
            })
            .catch((err) => {
                console.error(`Problem adding new vet to backend database: ${err}`)
            })
            .finally(() => {
                console.log(`New vet added to database: ${JSON.stringify(newVet)}`)
            })
    }

    handleDeleteVet = (deletedVet) => {
        console.log(`Vet _id to be deleted: ${deletedVet._id}`)
        axios.delete(`${BASE_URL}/vets/${deletedVet._id}`)
            .then((response) => {
                if(response.status === 201) {
                    const updatedVets = this.state.vets.filter(vet => vet._id !== deletedVet._id )
                    this.setState({
                        vets: updatedVets,
                        filteredVets: updatedVets,
                    })
                }
            })
            .catch((err) => {
                console.error(`Problem removing vet._id ${deletedVet._id}: ${err}`)
            })
            .finally(() => {
                console.log(`Deleted vet with id ${deletedVet._id}`)
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
                    size="small"
                />
                <NewVetForm modal={{closeOnBlur: true, showClose: true }} handleNewVet={this.handleNewVet}/>
                <VetGrid 
                    vets={gridVets}
                    handleDeleteVet={this.handleDeleteVet}
                />
            </Section>
        )
    }


}