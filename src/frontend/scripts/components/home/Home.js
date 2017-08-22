import React, { Component } from 'react';
import './Home.css';
import { Grid, Row, Col, Button, ButtonGroup, DropdownButton, MenuItem, FieldGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: 0,
            maxPrice: 1,
            minBaths: 0,
            maxBaths: 1,
            minBeds: 0,
            maxBeds: 1
        }

        this.numberWithCommas = this.numberWithCommas.bind(this);
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    priceSelect() {

    }

    render() {
        const priceTiers = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2500000, 3000000, 4000000, 5000000, 7500000, 10000000];

        return (
            <div className="container SearchContainer">
                <br /><br />
                <form>
                    <FormGroup controlId="formControlsSelect">

                        <Row className="show-grid">
                            <Col md={3} />
                            <Col md={2}>
                                <FormGroup>
                                    <ControlLabel>Minimum Price</ControlLabel>
                                    <FormControl onChange={this.priceSelect()} componentClass="select" placeholder="select">
                                        <option value={null}>Any</option>
                                        {
                                            priceTiers.map((price, i) =>
                                                <option key={i} value={price}>${this.numberWithCommas(price)}</option>
                                            )
                                        }
                                    </FormControl>
                                    <ControlLabel>Maximum Price</ControlLabel>
                                    <FormControl onSelect={this.priceSelect()} componentClass="select" placeholder="select">
                                        <option value={null}>Any</option>
                                        {
                                            priceTiers.map((price, i) =>
                                                <option key={i} value={price}>${this.numberWithCommas(price)}</option>
                                            )
                                        }
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <ControlLabel>Minimum Rooms</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </FormControl>
                                    <ControlLabel>Maximum Rooms</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="any">No max</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <ControlLabel>Minimum Bathrooms</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </FormControl>
                                    <ControlLabel>Maximum Bathrooms</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="any">No max</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>

                    </FormGroup>
                </form>

            </div>
        )
    }
}

export default Home;