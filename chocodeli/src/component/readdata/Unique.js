import React, {PureComponent} from "react";
import "./readdata.css";
import { BarChart,Legend } from 'react-easy-chart';
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
          let legend = {}

          record['x'] = keyName;
          record['y'] = data[keyName];

          legend['key'] = keyName;
          legend['value'] = data[keyName];

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
    {
      <BarChart
      axisLabels={{ x: 'My x Axis', y: 'My y Axis' }}
      axes
      colorBars
      grid
      height={275}
      width={500}
      xTickNumber={5}
      yTickNumber={5}
      data = {this.state.dataChart}
      />
    }
    <div className="containLegend">
    {
      <Legend 
      data={this.state.legend} 
      dataId={'key'} 
      horizontal
      />

    }
    </div>
    </div>
    </div>
    )
}
};
export default Unique;