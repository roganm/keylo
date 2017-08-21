import React, { Component } from 'react';
import Realtor from './components/realtor/Realtor';
import './App.css';

window.React = React

class App extends Component {

/*
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


  <img src="logo.svg" className="App-logo" alt="Hello" />
*/
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          
          <h2>Keylo Realtor Hubness of Awesome</h2>
          Navbar | Navbar | Navbar | Navbar
        </div>
        <div>
            
            <Realtor />
        </div>
      </div>      
    );
    
    
    /*

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
    );*/


  }
}

export default App;
