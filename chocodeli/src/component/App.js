import React, { PureComponent, Suspense, lazy } from 'react';
import	Header from './Header';
import Loading from './Loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const Result = lazy(()=> import('./Result'));
const ReadRawData = lazy(()=> import('./ReadRawData'));

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
      <Suspense fallback= {<Loading />}>
      <div className="wrapper">
        <Header callbackFromParent={this.myCallback} />      
        <Switch>
          <Route exact path='/' render={()=><ReadRawData/>} />
          <Route path='/algorthm' 
          render={(props)=> <Result {...props} 
          showContent={this.state.showContent}/>} />
          </Switch>
      </div>
      </Suspense>
      </Router>
    );
  }

}

export default App;
