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
        console.log(page);
        this.setState({
            currentPage: page
        });
    }

    handlePerPageChange(pages) {
        console.log(pages);
        this.setState({
            realtorsPerPage: pages
        });
    }

    handleFilterTextInput(filterText) {
        this.setState({
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

    render() {
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

        if (this.state.currentPage > pages) {
            if (pages < 1) pages = 1;
            this.setState({
                currentPage: pages
            });
        }

        return (
            (!this.state.selectedRealtorData) ?
                <div className="RealtorContainer">
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