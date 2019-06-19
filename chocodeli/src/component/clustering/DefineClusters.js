import React, {PureComponent} from "react";
import "./clustering.css";
import {ScatterplotChart,Legend} from 'react-easy-chart';

class DefineClusters extends PureComponent {
	setDataLegend(){
		let k = this.props.K_cluster;
		if(k !== null){
			let arrLegend = [];
			for(let i = 0 ; i< parseInt(k); i++){
				let legend = {};

				legend['key'] = 'Cluster '+ (i+1);
				legend['value'] = i;

				arrLegend.push(legend);
			}
			return arrLegend;
		}
		return [];
	}
	render(){
		let dataLengend = this.setDataLegend();
		return(
			<div className="col-lg-6">
			<div id="containchart">
			<div className="titlechart">
			Define Clusters
			</div>
			<ScatterplotChart 
			axes
			axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
			grid
			verticalGrid
			margin={{top: 15, right: 20, bottom: 5, left: 70}}
			width={500}
			height={280}
			data={this.props.DataScatterPlot}
			/>
			<div className="containLegend">
		    {
		      <Legend 
		      data={dataLengend} 
		      dataId={'key'} 
		      horizontal
		      />

		    }
		    </div>
			</div>
			</div>
		)
	}
}
export default DefineClusters;
