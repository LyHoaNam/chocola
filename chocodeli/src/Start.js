import React, { PureComponent } from 'react';
import ChoseData from './component/ChoseData';
import App from './component/App';

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
      {
          this.state.ShowApp ==='hide' ?
              <ChoseData SendSuccess={this.choseFileCallBack}/>:
              <App/>           
      }
      
      </div>
    );
  }
}

export default Start;
