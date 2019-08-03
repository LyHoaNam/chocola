import React, { PureComponent } from 'react';
import App from './component/App';
import Login from "./component/account/Login";

class Start extends PureComponent {
  render() {
    let Auth = localStorage.getItem('Auth') !== null ?
    localStorage.getItem('Auth'): false
    return (
      <div>
      {
          Auth === false ?
          <Login />:
          <App/>
         
      }
      
      </div>
    );
  }
}

export default Start;
