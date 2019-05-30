import React, {PureComponent} from "react";
import "./clustering.css";
import {ScatterplotChart} from 'react-easy-chart';
class DefineClusters extends PureComponent {
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
			data={this.props.DataScatterPlot}
			/>
				</div>

				</div>
				)
			}
		}

		export default DefineClusters;
