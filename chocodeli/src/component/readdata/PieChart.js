import React, {PureComponent} from "react";
import "../../style/main.css";
import Highcharts from 'highcharts/highstock';
import PieChart from 'highcharts-react-official';
class Infomation extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      legend:[],
      dataChart:[]
    }
  }
  componentDidMount(){
    if(this.props.Data !== null){
      let data = JSON.parse(this.props.Data)
      let arrDataChart = []
      Object.keys(data).map((keyName, i) => {
        let record = {};

        record['name'] = keyName;
        record['y'] = data[keyName];
        arrDataChart.push(record);

      })
      this.setState({dataChart:arrDataChart});
    }
  }

  render(){
    return (
      <div className="MarginTop">
      <div className="Infomation">
      <div className="DetailInfo">
      Data types in csv file
      </div>
      <div className="containChart">
      <div className="containRightLegend">
      </div>
      <div className="piechart">
      <PieChart
      highcharts={Highcharts}
      options={{
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        height: 230,
        spacingLeft: 0
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
       tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
      
      series: [{
        name: 'Type',
        data: this.state.dataChart
      }]
    }}
    />
    </div>
    </div>
    </div>
    </div>
    )
  }
};
export default Infomation;