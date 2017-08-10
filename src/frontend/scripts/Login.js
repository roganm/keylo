import React, { Component } from 'react';
import './App.css';

class Login extends Component {
  render() {
    return (

          <form>
            <div>
                <label>E-mail: &nbsp;</label>
            <input type="text" />
            </div>
            <div>
                <label>Password: &nbsp;</label>
            <input type="password" />
            </div>
            
          </form>

    );
  }
}

export default Login;