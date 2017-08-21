import React, { Component } from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var buttons = [];

        for (var i = 1; i <= this.props.pages; i++) {
            buttons.push(i);
        }

        return (
            <div className="Pagination">
                <span><br></br>Showing {this.props.first} to {this.props.last} of {this.props.total}
                </span>
                <br></br>
                <ButtonGroup>
                    {
                        buttons.map((button) =>
                            <Button active={this.props.current === button} key={button} onClick={() => this.props.pageHandler(button)}>{button}</Button>
                        )
                    }
                    <DropdownButton title="Records Per Page" id="bg-nested-dropdown">
                        <MenuItem eventKey="1" active={this.props.perPage === 25} onClick={() => this.props.perPageHandler(25)}>25</MenuItem>
                        <MenuItem eventKey="2" active={this.props.perPage === 50} onClick={() => this.props.perPageHandler(50)}>50</MenuItem>
                        <MenuItem eventKey="3" active={this.props.perPage === 75} onClick={() => this.props.perPageHandler(75)}>75</MenuItem>
                        <MenuItem eventKey="4" active={this.props.perPage === 100} onClick={() => this.props.perPageHandler(100)}>100</MenuItem>
                    </DropdownButton>
                </ButtonGroup>
            </div>
        );
    }
}

export default Pagination;