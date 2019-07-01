import React, {PureComponent} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
class ValueChart extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			dataChart: null
		}
	}

	render(){
		
		return(
			<div className="">
			<div className="titlechart">
			Number of occurrences of values
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
				series: this.props.dataChart,
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
			)
	}
}

export default ValueChart;
