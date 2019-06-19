import React, {PureComponent} from "react";
import {LineChart,Legend} from 'react-easy-chart';
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
		let dataLegend = [
		{'key':'Value user at '+this.props.col1,
		'value': 0},
		{'key':'Value item at '+this.props.col2,
		'value': 0}
		];
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
			 <div className="containRightLegendForPredit">
		      {
		      <Legend 
		      data={dataLegend} 
		      dataId={'key'} 
		      styles={{
		        '.legend':{
		        borderRadius: '12px',
		        fontSize: '0.8em',
		        maxWidth: '300px',
		        padding: '12px',
		        display: 'block'
		      },
		      '.legend li.horizontal':{
		        display: 'block'
		      }
		      }}
		      />
		      }
		      </div>
			</div>
			)
	}
}

export default ValueChart;
