import React, { Component } from 'react';
import Realtors from './Realtors';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] }
  }

  componentDidMount() {
    return fetch('./realtors')
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response  
        response.json().then(data => {
          console.log(data);
          this.setState({ items: data.data });
        });
      }
      )
      .catch(function (err) {
        console.log('Fetch Error', err);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="logo.svg" className="App-logo" alt="Hello" />
          <h2>Welcome to Keylo</h2>
        </div>
        <div>
          <ul><br/>
            {
              this.state.items.length ?
                this.state.items.map(item => <li key={item.guid}>{item.photo ? <img src={item.photo}/> : <span>PHOTO</span>}{item.name}</li>)
                : <p>Loading. . .</p>
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
