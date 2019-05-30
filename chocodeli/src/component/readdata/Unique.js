import React, {PureComponent} from "react";
import "../../style/main.css";
import { BarChart } from 'react-easy-chart';
/*
data={[{ x: '10-Jan-15', y: 20, color: '#f00' },
                { x: '12-Jan-15', y: 10 , color: 'orange' },
                { x: '15-Jan-15', y: 33 }]}
                */
class Unique extends PureComponent {
DefineDataChart(){
if(this.props.Data !== null)
{let data = JSON.parse(this.props.Data)
  let result = []
  Object.keys(data).map((keyName, i) => {
    let record = {};
    record['x'] = keyName;
    record['y'] = data[keyName];
    result.push(record);
  })
  return result;}
  return [];
}

render(){
  let DataBarChart = this.DefineDataChart();
  return (
    <div className="col-lg-8">
    <div className="Infomation">
    <div className="DetailInfo">
    Unique
    </div>
    {

      <BarChart
      axisLabels={{ x: 'My x Axis', y: 'My y Axis' }}
      axes
      colorBars
      grid
      height={300}
      width={475}
      xTickNumber={5}
      yTickNumber={5}
      data = {DataBarChart}
      />
    }
    </div>
    </div>
    )
}
};
export default Unique;