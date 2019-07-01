import React, {PureComponent} from "react";
import "./clustering.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
class DefineClusters extends PureComponent {
	setDataForChart(){
		let result = [];
		if(this.props.DataScatterPlot.length >0){
			this.props.DataScatterPlot.map((records,items)=>{
				let obj = {};
				obj['name'] = 'cluster '+items;
				obj['data'] = records;
				result.push(obj);
			})
		}
		return result;
	}
	render(){
		let DataForChart = this.setDataForChart();
		return(
			<div className="col-lg-6">
			<div id="containchart">
			<div className="titlechart">
			Define Clusters
			</div>
			
			<HighchartsReact
			highcharts={Highcharts}
			options={{
				chart: {
			        type: 'scatter',
			        zoomType: 'xy',
			        height: 375
			    },
				title: {
					text: ''
				},
			    plotOptions: {
			        scatter: {
			            marker: {
			                radius: 5,
			                states: {
			                    hover: {
			                        enabled: true,
			                        lineColor: 'rgb(100,100,100)'
			                    }
			                }
			            },
			            states: {
			                hover: {
			                    marker: {
			                        enabled: false
			                    }
			                }
			            },
			            tooltip: {
			                headerFormat: '<b>{series.name}</b><br>',
			                pointFormat: '{point.x}, {point.y}'
			            }
			        }
			    },
				series: DataForChart,
				credits: {
					enabled: false
				}, 
				yAxis: {
					title: {
						text: ''
					}
				}
				
			}}
			/>
			</div>
			</div>
			)
	}
}
export default DefineClusters;
