import React, {PureComponent} from "react";
import "./readdata.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
/*
data={[{ x: '10-Jan-15', y: 20, color: '#f00' },
                { x: '12-Jan-15', y: 10 , color: 'orange' },
                { x: '15-Jan-15', y: 33 }]}
                */
class Unique extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      legend:[],
      dataChart:[]
    }
  }
  componentDidMount(){

    if(this.props.Data !== null){
      let data = JSON.parse(this.props.Data);
      let arrLengend = [];
      let arrDataChart = [];
    
      Object.keys(data).map((keyName, i) => {
          let record = {};
          let legend = {};
          let arr = [];
          arr.push(data[keyName])
          record['name'] = keyName;
          record['data'] = arr;

          arrLengend.push(keyName);

          arrDataChart.push(record);
          arrLengend.push(legend);
        });
      this.setState({dataChart:arrDataChart,legend:arrLengend});
    }
  }

render(){
  
  return (
    <div className="col-lg-8">
    <div className="Infomation">
    <div className="DetailInfo">
    Unique value of each column
    </div>
     <HighchartsReact
      highcharts={Highcharts}
    options={{
          title: {
            text: ''
          },
          chart: {
              type: 'column'
          },
          series: this.state.dataChart,
          credits: {
          enabled: false
        },
        labels:
        {
          enabled: false
        },
          yAxis: {
          title: {
                    text: ''
                }
        },
        xAxis: {
            categories: this.state.legend
        }

      }}
      />

    </div>
    </div>
    )
}
};
export default Unique;