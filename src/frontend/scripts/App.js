import React, { Component } from 'react';
import Realtor from './components/realtor/Realtor';
import './App.css';

window.React = React

class App extends Component {

  render() {

    return (
      <div className="App container">

        <div className="App-header">
          <img src="logo.svg" className="App-logo" alt="Hello" /> 
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

accept acceptCharset accessKey action allowFullScreen allowTransparency alt
async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
charSet checked cite classID className colSpan cols content contentEditable
contextMenu controls coords crossOrigin data dateTime default defer dir
disabled download draggable encType form formAction formEncType formMethod
formNoValidate formTarget frameBorder headers height hidden high href hrefLang
htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label
lang list loop low manifest marginHeight marginWidth max maxLength media
mediaGroup method min minLength multiple muted name noValidate nonce open
optimum pattern placeholder poster preload profile radioGroup readOnly rel
required reversed role rowSpan rows sandbox scope scoped scrolling seamless
selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step
style summary tabIndex target title type useMap value width wmode wrap

    );*/


  }
}

export default App;
