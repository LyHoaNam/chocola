import React, { PureComponent } from 'react';
import App from './component/App';
import Login from "./component/account/Login";

class Start extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      profile:""
    }
  }
  componentDidMount(){
    if(localStorage.getItem('account')){
      let tempdata=localStorage.getItem('account');
      tempdata=JSON.parse(tempdata);
      this.setState({profile:tempdata});
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
