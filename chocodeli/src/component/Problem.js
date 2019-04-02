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
	componentWillUnmount() {
  clearInterval(this.interval); // Always clean up before unmounting
}
componentDidMount() {
   var intervalId = setInterval(() => {
		this.setState({wait:false});
        // Do something here e.g. increment the time
        // NOTE: `this` keyword here refers to the component itself
      }, 500);
   // store intervalId in the state so it can be accessed later:
   this.setState({wait: true});
}
	render(){
		if(this.state.wait)
		return(
			<div id="content">
			<div className="propblem">
			<div className="coinproblem">
			<p className="strproblem">

			Oh! This have not result
			</p>
			</div>
			</div>
			</div>
			)
		else return <Loading/>
	}
}
export default Problem;