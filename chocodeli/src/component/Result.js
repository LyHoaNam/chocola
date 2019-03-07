import React, {PureComponent} from "react";
import PropsTypes from "prop-types";
import "../style/main.css";
import Loading from "./Loading";
import Infomation from "./Infomation";
import Content from "./Content";
class Result extends PureComponent {
  constructor(props) {
    super(props);
  this.state = {
      result: null, 
      min_conf: 0,
      min_sup:0,
      showcontent: this.props.showContent
    };

  }
  componentDidMount () {
    this.getData();
  }
componentWillReceiveProps(nextProps){ 
  if(nextProps.showContent !== this.props.showContent)
    this.setState({showcontent: nextProps.showContent},this.getData);

}
  getData() {
     fetch(`http://127.0.0.1:5000/api/${this.state.showcontent}`)
      .then(response => response.json())
      .then(ruleData => this.setState({result:ruleData.rules,
        min_sup:ruleData.min_sup,
        min_conf:ruleData.min_conf
      }))
      .catch(e => e)
   
  }

  render() {
    if(this.state.result)
    {
    return (   
      <div id="content">
      
        <div className="row">
          <div className="col-lg-12 pad10">
            <div className="col-lg-6">
            <p className="titleContent">Algorthm: </p>
            </div>
          </div>
        </div>
       
        <Infomation/>
        <Content Data={this.state.result}
                  Show={this.state.showcontent}/>
      </div>

      )
      }
      else return <Loading />

  }
};
export default Result;