import React, { Component } from 'react';
import Login from './Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="logo.svg" className="App-logo" alt="Hello" />
          <h2>Welcome to Keylo</h2>
        </div>
        <p className="App-intro"><br />
          To begin, do 2084 pushups.
        </p>
        <Login />
      </div>
    );
  }
}

export default App;
