import React, {PureComponent} from "react";
import "../style/loading.css"
class Loading extends PureComponent {
	render(){
	return (
		<div className="container">
		<div className="ContainLoading">
		<img alt="" src={require('../img/loading.png')} id="loading"/>
		</div>
		</div>
		)		
	}
}
export default Loading;