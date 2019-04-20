import React, { PureComponent } from 'react';
import App from './component/App';
import Login from "./component/login/Login";

class Start extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      ShowApp:"hide"
    }
  }
  choseFileCallBack = (result) =>{
    this.setState({ShowApp:result},console.log(""));
    
  }

  render() {
    return (
      <div>
      <Login />
      {
         // this.state.ShowApp ==='hide' ?
         //     <ChoseData SendSuccess={this.choseFileCallBack}/>:
          //    <App/>           
      }
      
      </div>
    );
  }
}

export default Start;
