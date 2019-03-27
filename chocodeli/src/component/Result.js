import React, {PureComponent} from "react";
import "../style/main.css";
import Fpgrowth from "./Fpgrowth";
import Apiori from "./Apiori";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
class Result extends PureComponent {
  constructor(props) {
    super(props);
  this.state = {
      result: null, 
      min_conf: 0,
      min_sup:0,
      showcontent: "fpgrowth"
    };

  }

  componentDidMount () {
    let states = this.props.location.datasend;

  }

  render() {
    return (
    <Router>
      <Switch>
      <Fpgrowth/>
        <Route exact path='./algorthm/fpgrowth'
        render={()=><Fpgrowth/>} />
        <Route exact path='./algorthm/apiori'
        render={()=><Apiori/>} />
      </Switch>
    </Router>
    )
  }
};
export default Result;