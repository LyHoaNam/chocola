import React, {PureComponent} from "react";
import "./clustering.css";
import {ScatterplotChart} from 'react-easy-chart';
class DefineClusters extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			tooltipnumber:false,
			valueNumber:null
		}
		this.handleNumber = this.handleNumber.bind(this);
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
	render(){
		return(
			<div className="col-lg-6">
			<div id="containchart">
			<div className="titlechart">
			Number Of Clusters
			</div>
			<ScatterplotChart 
			axes
			axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
			grid
			verticalGrid
			margin={{top: 30, right: 60, bottom: 30, left: 60}}
			width={500}
			height={300}
			data={[
				{
					type: 'One',
					x: 1,
					y: 5
				},
				{
					type: 'Two',
					x: 3,
					y: 1
				},
				{
					type: 'Three',
					x: 0,
					y: 6
				},
				{
					type: 'Four',
					x: 5,
					y: 2
				},
				{
					type: 'Five',
					x: 4,
					y: 4
				},
				{
					type: 'Six',
					x: 5,
					y: 9
				},
				{
					type: 'Seven',
					x: 9,
					y: 1
				},
				{
					type: 'Eight',
					x: 5,
					y: 6
				},
				{
					type: 'Nine',
					x: 3,
					y: 9
				},
				{
					type: 'Ten',
					x: 7,
					y: 9
				}
				]
			}
			/>
				</div>

				</div>
				)
			}
		}

		export default DefineClusters;
