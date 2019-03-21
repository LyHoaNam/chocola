import React, {PureComponent} from "react";
import "../style/chill.css";
import ChooseAlgorthm from "./ChooseAlgorthm";
import NextAlgorthm from "./NextAlgorthm";
class SetAlgorthm extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			Name: null,
			NumberCom: 0
		}
	}
	NameCallback = (dataFromChild) =>{
		this.setState({Name:dataFromChild,
			NumberCom:1});
	}
	render(){
		
		return (
			<div>
			{
			this.state.NumberCom===0 ? 
			<ChooseAlgorthm onHide={this.props.onHide}
			show={this.props.show}/>:	
			<NextAlgorthm AlgoName={this.NameCallback}
						onHide={this.props.onHide}/>
			}
			</div>
			)
		}
	}
	export default SetAlgorthm;