import React, {PureComponent} from "react";
import "./clustering.css";
import {LineChart} from 'react-easy-chart';
class NumberOfClusters extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			tooltipnumber:false,
			valueNumber:3
		}
		this.handleNumber = this.handleNumber.bind(this);
		this.selectValue = this.selectValue.bind(this);
	}

	handleNumber(event){
		let number=event.target.value; //this is typeof string
		let interger=parseInt(number,10); //convert string to number
		if(Number.isInteger(interger) && interger >0 && interger <10){
			this.setState({valueNumber:interger,tooltipnumber:false});
		}
		else {
			this.setState({tooltipnumber:true})
		}
	}
	selectValue(event){
		let valueSend = this.state.valueNumber;
		this.props.callbackValue(valueSend);
	}
	render(){
		let arrData = [];
		arrData.push(this.props.DataLineChart);
			return(
			<div className="col-lg-6">
			<div id="containchart">
			<div className="titlechart">
			Number Of Clusters
			</div>
			<LineChart
			axes
			axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
			grid
			verticalGrid
			margin={{top: 30, right: 60, bottom: 30, left: 60}}
			width={500}
			height={300}
			data={arrData}
				/>
				<div className="choseNumber">
				<input type="number"
				min="1"
				max="10"
				name="NumberOfClusters"
				className="inputNumber"
				value = {this.state.valueNumber} 
				onChange={this.handleNumber}/>
				<div className="tooltipNoti">
				<span className={!this.state.tooltipnumber? 
					"tooltiptext":
					"tooltipActive"}>
					{'This number should be ~will update late~ :v!'}
					</span>
					</div>
					<span className="SetNumber"
					onClick = {this.selectValue}>
					Set Number of Clusters
					</span>
					</div>

					</div>

					</div>
					)
		}
	}

	export default NumberOfClusters;
