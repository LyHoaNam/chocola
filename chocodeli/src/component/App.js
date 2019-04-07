import React, { PureComponent, Suspense, lazy } from 'react';
import	Header from './Header';
import Loading from './Loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Result from "./Result";
import Test from "./Test";
const ReadRawData = lazy(()=> import('./ReadRawData'));

class App extends PureComponent {



  render() {
     return (
      <Router>
      <Suspense fallback= {<Loading />}>
      <div className="wrapper">
        <Header callbackFromParent={this.myCallback} />      
        <Switch>
          <Route exact path='/' render={()=><ReadRawData/>} />
          <Route path='/algorthm/:id' 
          render={(props)=> <Result  {...props}/>} />
          <Route path='/test/:id' render={(props)=><Test  {...props}/>} />
          </Switch>
      </div>
      </Suspense>
      </Router>
    );
  }

}

export default App;
