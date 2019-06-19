import React, {PureComponent} from "react";
import "../../style/main.css";
import { PieChart,Legend } from 'react-easy-chart';

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
      let arrLengend = [];
      Object.keys(data).map((keyName, i) => {
        let record = {};
        let legend = {}

        record['key'] = keyName;
        record['value'] = data[keyName];
        legend['key'] = keyName;
        legend['value'] = data[keyName];

        arrDataChart.push(record);
        arrLengend.push(legend);
      })
      this.setState({dataChart:arrDataChart,
        legend:arrLengend});
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
      {
      <Legend 
      data={this.state.legend} 
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

      <PieChart
      data={this.state.dataChart}
      size={150}
      innerHoleSize={90}
      labels
      styles={{
        '.chart_lines': {
          strokeWidth: 0
        },
        '.chart_text': {
          fontFamily: 'serif',
          fontSize: '1.25em',
          fill: '#333'
        }
      }}
      />
      </div>
      </div>
      </div>
      )
  }
};
export default Infomation;