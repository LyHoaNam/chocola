import React, { PureComponent } from 'react';
import App from './component/App';
import Login from "./component/account/Login";

class Start extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      auth:""
    }
  }
  componentDidMount(){
    if(localStorage.getItem('Auth')){
      let tempdata=localStorage.getItem('Auth');
      this.setState({Auth:tempdata});
    }
  }

  render() {

    return (
      <div>
      {
          this.state.profile==='' ?
          <Login />:
          <App/>
         
      }
      
      </div>
    );
  }
}

export default Start;
