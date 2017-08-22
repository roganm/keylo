import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <form className="SearchBar">
                        <Col md={4} />
                        <Col xs={12} md={4}>
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Filter Results by Realtor Name"
                                value={this.props.filterText}
                                onChange={this.handleFilterTextInputChange}
                                placeholder={null}
                            />
                        </Col>
                        <Col md={4} />
                    </form>
                </Row>
            </Grid>
        );
    }
}

export default SearchBar;