import React, { Component } from 'react';
import { RealtorList } from './RealtorList';
import data from '../../lib/realtors.json';

class Realtor extends Component {

    render() {
        <RealtorList realtors={data} />
    }
}

export default Realtor;