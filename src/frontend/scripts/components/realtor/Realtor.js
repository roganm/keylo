import React, { Component } from 'react';
import RealtorList from './RealtorList';
import RealtorDetail from './RealtorDetail';
import './Realtor.css';
import data from '../../lib/realtors.json';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form className="SearchBar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
            </form>
        );
    }
}

class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="Pagination">
                <span>Total Pages: {this.props.pages} || Showing {this.props.first} to {this.props.last} of {this.props.total}
                </span>
                <span className="Page">1
                </span>
                <span className="Page">2
                </span>
                <span className="Page">3
                </span>
                <span className="Page">4
                </span>
            </div>
        );
    }

}

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
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        }, () => {
            console.log(this.state.filterText);
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
        var last = total;
        var pages = 1;
        if (rows.length > this.state.realtorsPerPage) {
            rows = rows.slice(((this.state.currentPage - 1) * this.state.realtorsPerPage), ((this.state.currentPage - 1) * this.state.realtorsPerPage) + this.state.realtorsPerPage);
            last = ((this.state.currentPage - 1) * this.state.realtorsPerPage) + this.state.realtorsPerPage;
            pages =Math.ceil(total / this.state.realtorsPerPage);
            
        }        
        
        return (
            (!this.state.selectedRealtorData) ?
                <div className="RealtorContainer">
                    <SearchBar
                        filterText={this.state.filterText}
                        onFilterTextInput={this.handleFilterTextInput} />
                    <RealtorList
                        realtors={rows}
                        currentPage={this.state.currentPage}
                        handler={this.realtorSelector} />
                    <Pagination
                        first={first}
                        last={last}
                        total={total}
                        pages={pages} />
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