import React, {PureComponent} from "react";
import "../../style/main.css";
import { LineChart } from 'react-easy-chart';
import {Table} from "react-bootstrap";
class ChartForRule extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      data : null,
      authorization:""
    }
  }

  DefineDataLineChart(){
    if(sessionStorage.getItem('des')){
      let result = [];
      let DataChart = sessionStorage.getItem('des');
      DataChart = JSON.parse(DataChart);
      Object.keys(DataChart).map((keyName,i)=>{
        let arr = [];
        let obj1 = {
          'x': 0,
          'y': DataChart[keyName]['min']
        };

        let obj2 = {
          'x': 25,
          'y': DataChart[keyName]['25%']
        };


        let obj3 = {
          'x': 50,
          'y': DataChart[keyName]['50%']
        };

        let obj4 = {
          'x': 75,
          'y': DataChart[keyName]['75%']
        };

        let obj5 = {
          'x': 100,
          'y': DataChart[keyName]['max']
        };
        arr.push(obj1,obj2,obj3,obj4,obj5);
        result.push(arr);
      })
      return result;
    }
    return [[]];
  }
  writeTable(){
    if(sessionStorage.getItem('des')){
      try {
        let result = [];
        let DataTable = sessionStorage.getItem('des');
        DataTable = JSON.parse(DataTable);
        Object.keys(DataTable).map((keyName,i)=>{
          result.push(
            <tr key={i}>
            <td key="keyName">{keyName}</td>
            <td key="Count">{DataTable[keyName]['count']}</td>
            <td key="Std">{Number((DataTable[keyName]['std']).toFixed(2))}</td>
            <td key="Mean">{Number((DataTable[keyName]['mean']).toFixed(2))}</td>
            <td key="Min">{DataTable[keyName]['min']}</td>
            <td key="20">{DataTable[keyName]['25%']}</td>
            <td key="50">{DataTable[keyName]['50%']}</td>
            <td key="75">{DataTable[keyName]['75%']}</td>
            <td key="Max">{DataTable[keyName]['max']}</td>
            </tr>
            )
        })
        return result;
      }
      catch(err){
        console.log(err);
      }}
      return <tr></tr>;
    }
    render(){
      let DataLineChart = this.DefineDataLineChart();
      let DataTable = this.writeTable();
      return (
        <div className="Infomation margin30">
        <div className="DetailInfo">
        Describe
        </div>

        <LineChart
        axes
        axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
        grid
        verticalGrid
        margin={{top: 30, right: 60, bottom: 30, left: 60}}
        width={400}
        height={300}
        data={DataLineChart}
        />
        <Table responsive>
        <thead>
        <tr>
        <th>#</th>
        <th>Count</th>
        <th>Std</th>
        <th>Mean</th>
        <th>Min</th>
        <th>25%</th>
        <th>50%</th>
        <th>75%</th>
        <th>Max</th>
        </tr>
        </thead>
        <tbody>
        {
          DataTable
        }
        </tbody>
        </Table>
        </div>
        )
    }
  };
  export default ChartForRule;