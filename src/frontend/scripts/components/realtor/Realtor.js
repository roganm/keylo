import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import RealtorList from './RealtorList';
import RealtorDetail from './RealtorDetail';
import Home from '../home/Home';
import './Realtor.css';

class Realtor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            realtors: null,
            realtorsPerPage: 25,
            currentPage: 1,
            selectedRealtorData: null
        }

        this.realtorSelector = this.realtorSelector.bind(this);
        this.realtorClear = this.realtorClear.bind(this);
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePerPageChange = this.handlePerPageChange.bind(this);
    }

    handlePageChange(page) {
        this.setState({
            currentPage: page
        });
    }

    handlePerPageChange(pages) {
        this.setState({
            currentPage: 1,
            realtorsPerPage: pages
        });
    }

    handleFilterTextInput(filterText) {
        this.setState({
            currentPage: 1,
            filterText: filterText
        });
    }

    realtorSelector(guid) {
        fetch('./realtors/' + guid)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(listings => {
                    this.setState({
                        selectedRealtorData: listings.data
                    });
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error', err);
            });

    }

    realtorClear() {
        this.setState({
            selectedRealtorData: null
        });
    }

    componentDidMount() {
        return fetch('/fancy')
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(data => {
                    this.setState({ realtors: data.data[0] });
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error', err);
            });
    }

    render() {
        if (this.state.realtors) {
            var rows = [];
            const filter = this.state.filterText.toLowerCase();
            this.state.realtors.forEach((realtor) => {
                name = realtor.name.toLowerCase();
                if (name.indexOf(filter) !== -1) rows.push(realtor);
            });

            var total = rows.length;
            var first = ((this.state.currentPage - 1) * this.state.realtorsPerPage) + 1;

            if (rows.length > this.state.realtorsPerPage) {
                rows = rows.slice((first - 1), (first - 1 + this.state.realtorsPerPage));
            }

            var pages = Math.ceil(total / this.state.realtorsPerPage);
            var last = first + rows.length - 1;

            if (rows.length === 0) {
                first = last = 0;
            }

            if (this.state.selectedRealtorData) {
                return (
                    <div className="RealtorContainer">
                        <RealtorDetail
                            listings={this.state.selectedRealtorData} />
                        <br></br><Button onClick={this.realtorClear}>Back</Button>
                    </div>
                )
            }

            if (last > 0) {
                return (
                    <div className="RealtorContainer">
                        <Home />
                        <SearchBar
                            filterText={this.state.filterText}
                            onFilterTextInput={this.handleFilterTextInput} />
                        <RealtorList
                            realtors={rows}
                            handler={this.realtorSelector} />
                        <Pagination
                            first={first}
                            last={last}
                            total={total}
                            current={this.state.currentPage}
                            pages={pages}
                            perPage={this.state.realtorsPerPage}
                            pageHandler={this.handlePageChange}
                            perPageHandler={this.handlePerPageChange} />
                    </div>
                )
            }

            return (
                <div className="RealtorContainer">
                    <Home />
                    <SearchBar
                        filterText={this.state.filterText}
                        onFilterTextInput={this.handleFilterTextInput} />
                    <p className="NoResults">No results to display.</p><br /><br />
                </div>
            )
        } else {
            return (null)
        }
    }
}

export default Realtor;