import React,{PureComponent} from "react";
import '../style/chill.css';
import Loading from "./Loading";
class Problem extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			wait:false,
		}
	
	}
componentDidMount() {
  setTimeout(function() { //Start the timer
      this.setState({wait: true}) //After 1 second, set render to true
  }.bind(this), 5000)
}
	render(){
		if(this.state.wait)
		return(
			<div id="content">
			<div className="col-lg-12">
			<div className="propblem">
			<div className="coinproblem">
			<p className="strproblem">

			Oh! This have not result
			</p>
			</div>
			</div>
			</div>
			</div>
			)
		else return <Loading/>
	}
}
export default Problem;