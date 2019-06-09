import React, {PureComponent} from "react";
import {LineChart} from 'react-easy-chart';
class ValueChart extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			dataChart: null
		}
	}

	render(){
		let arrData = [];
		arrData.push(this.props.dataChart.line1);
		arrData.push(this.props.dataChart.line2);
		console.log(arrData);
		return(
			<div className="">
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
			data={arrData
			}
			/>
			</div>
			)
	}
}

export default ValueChart;
