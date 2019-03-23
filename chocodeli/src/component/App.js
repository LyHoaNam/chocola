import React, { PureComponent } from 'react';
import	Menu from './Menu';
import Result from './Result';
import ReadRawData from './ReadRawData';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
class App extends PureComponent {
  constructor(props) {
    super(props);
  this.state ={
    showContent:"fpgrowth"
    }
  }


  //this fuction get data from child
  myCallback = (dataFromChild) => {
        this.setState({showContent:dataFromChild})
     
    }
  render() {

     return (
      <Router>
      
      <div className="wrapper">

        <Menu callbackFromParent={this.myCallback} />      
        <Switch>
          <Route exact path='/' component={ReadRawData} />
          <Route path='/algorthm' 
          render={(props)=> <Result {...props} 
          showContent={this.state.showContent}/>} />
          </Switch>
      </div>
      </Router>
    );
  }

}

export default App;
