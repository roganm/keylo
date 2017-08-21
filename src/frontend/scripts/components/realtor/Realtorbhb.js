import React, { Component } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import RealtorList from './RealtorList';
import RealtorDetail from './RealtorDetail';
import './Realtor.css';
import data from '../../lib/realtors.json';

class Realtor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            realtors: data,
            filter: [],
            page: [],
            realtorsPerPage: 25,
            currentPage: 1,
            selectedRealtorData: null
        }

        this.realtorSelector = this.realtorSelector.bind(this);
        this.realtorClear = this.realtorClear.bind(this);
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePerPageChange = this.handlePerPageChange.bind(this);
        this.performFilter = this.performFilter.bind(this);
        this.performPaging = this.performPaging.bind(this);
    }

    handlePageChange(page) {
        this.setState({
            currentPage: page
        }, this.performPaging());
    }

    handlePerPageChange(pages) {
        console.log(pages);
        this.setState({
            realtorsPerPage: pages
        }, this.performPaging());
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        }, this.performFilter());
    }

    performFilter() {
        var rows = [];
        const filter = this.state.filterText.toLowerCase();
        this.state.realtors.forEach((realtor) => {
            name = realtor.name.toLowerCase();
            if (name.indexOf(filter) !== -1) rows.push(realtor);
        });

        this.performPaging();
    }

    performPaging() {
        var rows = this.state.filter;
        var first = ((this.state.currentPage - 1) * this.state.realtorsPerPage) + 1;
        if (rows.length > this.state.realtorsPerPage) {
            rows = rows.slice((first - 1), (first - 1 + this.state.realtorsPerPage));
        }
        this.state.page = rows;
        
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

    componentWillMount() {
        this.state.filter = this.state.realtors;
        this.state.page = this.state.realtors.slice(0, this.state.realtorsPerPage);
    }

    render() {

        var total = this.state.filter.length;
        var first = ((this.state.currentPage - 1) * this.state.realtorsPerPage) + 1;
        var pages = Math.ceil(total / this.state.realtorsPerPage);
        var last = first + this.state.page.length - 1;

        if(this.state.page.length === 0) {
             first = last = 0;
        }

        return (
            (!this.state.selectedRealtorData) ?
                <div className="RealtorContainer">
                    <SearchBar
                        filterText={this.state.filterText}
                        onFilterTextInput={this.handleFilterTextInput} />
                    <RealtorList
                        realtors={this.state.page}
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
                </div> :
                <div>
                    <RealtorDetail
                        listings={this.state.selectedRealtorData} />
                    <br></br><button onClick={this.realtorClear}>Back</button>
                </div>
        )
    }
}

export default Realtor;