import React, {PureComponent} from "react";
import "../../style/main.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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
        let arrData = {};
            let arr = [];
            arr.push(DataChart[keyName]['min'])
            arr.push(DataChart[keyName]['25%']);
            arr.push(DataChart[keyName]['50%']);
            arr.push(DataChart[keyName]['75%']);
            arr.push( DataChart[keyName]['max']);
            arrData['data'] = arr;
            arrData['name'] = keyName;
            result.push(arrData);
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

         <HighchartsReact
      highcharts={Highcharts}
    options={{
          title: {
            text: 'The number of repetitions (incremental) of the values in the selected column'
          },
          series: DataLineChart,
          credits: {
          enabled: false
        }, 
        yAxis: {
          title: {
                    text: ''
                }
        },
        xAxis: {
            categories: ['Min', '25%', '50%', '75%', 'Max']
        }
      }}
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