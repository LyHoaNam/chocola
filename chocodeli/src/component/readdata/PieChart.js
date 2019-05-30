import React, {PureComponent} from "react";
import "../../style/main.css";
import { PieChart } from 'react-easy-chart';
class Infomation extends PureComponent {
  DefineDataChart(){
    if(this.props.Data !== null){
      let data = JSON.parse(this.props.Data)
      let result = []
      Object.keys(data).map((keyName, i) => {
        let record = {};
        record['key'] = keyName;
        record['value'] = data[keyName];
        result.push(record);
      })
      return result;
    }
    return [];
  }

  render(){
    let DataPieChart = this.DefineDataChart();
    return (
      <div className="MarginTop">
      <div className="Infomation">
      <div className="DetailInfo">
      Type
      </div>

      <PieChart
      data={DataPieChart}
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
      )
  }
};
export default Infomation;