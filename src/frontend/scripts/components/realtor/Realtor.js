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

class Realtor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            realtors: data,
            selectedRealtor: null
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

    realtorSelector(index) {
        this.setState({
            selectedRealtor: index
        });
    }

    realtorClear() {
        this.setState({
            selectedRealtor: null
        });
    }

    render() {
        var rows = [];
        const filter = this.state.filterText.toLowerCase();
        this.state.realtors.forEach((realtor) => {
            name = realtor.name.toLowerCase();
            if (name.indexOf(filter) !== -1) rows.push(realtor);
        });
        return (
            (!this.state.selectedRealtor) ?
                <div>
                    <SearchBar
                        filterText={this.state.filterText}
                        onFilterTextInput={this.handleFilterTextInput} />
                    <RealtorList
                        realtors={rows}
                        handler={this.realtorSelector} />
                </div> :
                <RealtorDetail
                    realtor={this.state.realtors[this.state.selectedRealtor]}
                    handler={this.realtorClear} />
        )
    }
}

export default Realtor;