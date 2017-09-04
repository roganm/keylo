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
            sortBy: 'average',
            asc: false,
            realtors: null,
            realtorsPerPage: 15,
            currentPage: 1,
            selectedRealtorData: null
        }

        this.realtorSelector = this.realtorSelector.bind(this);
        this.realtorClear = this.realtorClear.bind(this);
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePerPageChange = this.handlePerPageChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.sortFuncName = this.sortFuncName.bind(this);
        this.sortFuncAvg = this.sortFuncAvg.bind(this);
        this.sortFuncCount = this.sortFuncCount.bind(this);
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
                response.json().then(data => {
                    this.setState({
                        selectedRealtor: data.realtor,
                        selectedOrg: data.org,
                        selectedListings: data.listings
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
            selectedRealtor: null
        });
    }

    sortFuncName(a, b) {
        var n1 = a.name.toLowerCase();
        var n2 = b.name.toLowerCase();

        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;
    }

    sortFuncCount(a, b) {
        var o1 = a.cnt;
        var o2 = b.cnt;

        var p1 = a.average;
        var p2 = b.average;

        if (o1 < o2) return -1;
        if (o1 > o2) return 1;
        if (p1 < p2) return -1;
        if (p1 > p2) return 1;
        return 0;
    }

    sortFuncAvg(a, b) {
        var o1 = a.average;
        var o2 = b.average;

        var p1 = a.cnt;
        var p2 = b.cnt;

        if (o1 < o2) return -1;
        if (o1 > o2) return 1;
        if (p1 < p2) return -1;
        if (p1 > p2) return 1;
        return 0;
    }

    sortFuncAvg(a, b) {
        var o1 = a.average;
        var o2 = b.average;

        var p1 = a.cnt;
        var p2 = b.cnt;

        if (o1 < o2) return -1;
        if (o1 > o2) return 1;
        if (p1 < p2) return -1;
        if (p1 > p2) return 1;
        return 0;
    }

    handleSort(sortBy) {
        var realtors = this.state.realtors;
        var asc = !this.state.asc;
        if (sortBy === this.state.sortBy) {
            realtors = this.state.realtors.reverse();
            this.setState({
                asc: asc,
                realtors: realtors
            });
        } else if (sortBy === "average") {
            console.log("average");
            realtors.sort(this.sortFuncAvg);
            this.setState({
                asc: true,
                sortBy: sortBy,
                realtors: realtors
            });
        } else if (sortBy === "count") {
            realtors.sort(this.sortFuncCount);
            this.setState({
                asc: true,
                sortBy: sortBy,
                realtors: realtors
            });
        } else if (sortBy === "name") {
            realtors.sort(this.sortFuncName);
            this.setState({
                asc: true,
                sortBy: sortBy,
                realtors: realtors
            });
        } else if (sortBy === "tom") {
            realtors.sort(this.sortFuncTom);
            this.setState({
                asc: true,
                sortBy: sortBy,
                realtors: realtors
            });
        }



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
                    this.setState({ realtors: data.data });
                });
            })
            .catch(function (err) {
                console.log('Fetch Error', err);
            });
    }

    render() {
        if (this.state.realtors) {

            if (this.state.selectedRealtor) {
                return (
                    <div className="RealtorContainer">
                        <RealtorDetail
                            realtor={this.state.selectedRealtor}
                            org={this.state.selectedOrg}
                            listings={this.state.selectedListings} />
                        <div style={{ textAlign: 'center' }}><Button onClick={this.realtorClear}>Back</Button></div>
                    </div>
                )
            }


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

            if (last > 0) {

                return (
                    <div className="RealtorContainer container">
                        <Home />
                        <SearchBar
                            filterText={this.state.filterText}
                            onFilterTextInput={this.handleFilterTextInput} />
                        <RealtorList
                            realtors={rows}
                            asc={this.state.asc}
                            sortBy={this.state.sortBy}
                            handleSort={this.handleSort}
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