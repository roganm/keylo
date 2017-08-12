import React, { Component } from 'react';
import './App.css';

class Realtors extends Component {
  constructor(props) {
    super(props);
    this.state.data = props.data;
  }

  render() {
    return (

      <div>
        {this.state.data}
      </div>

    );
  }
}

export default Realtors;