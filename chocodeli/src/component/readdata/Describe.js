import React, {PureComponent} from "react";
import "../../style/main.css";
import {Table} from "react-bootstrap";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
class Describe extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      data : null,
      authorization:"",
      legend:[],
      dataChart:[]
    }
  }
  componentDidMount(){
    if(localStorage.getItem('Auth')){
      let author=localStorage.getItem('Auth');
      this.setState({authorization:author});
      this.getData(author);
    }
  }
  getData(bearer) {
    //ready to fetch data
    let url= '/data/describe'
    let options = {
      method: 'GET',
      headers: {
        'Authorization': bearer
      }
    }
    fetch(url,options)
    .then(res=>res.json())
    .then(res=>
    {
      let data = JSON.parse(res)
      let checkNull = Object.keys(data);
      if(data[checkNull[0]].min !== null){
        this.setState({data:data})
        this.DefineDataLineChart(data);  
      }
      else {
        this.getRuleData();
      }
    }
    )
    .catch(e=>{
      //window.location.href="/login";
    });   

  }
  getRuleData() {
    //ready to fetch data
    let url= '/rule/describe'
    let options = {
      method: 'GET',
      headers: {
        'Authorization': this.state.authorization
      }
    }
    fetch(url,options)
    .then(res=>res.json())
    .then(res=>
    {
      let data = JSON.parse(res);
      this.setState({data:data});
      this.DefineDataLineChart(data);
    }
    )
    .catch(e=>{
      //window.location.href="/login";
    });   

  }
    
    DefineDataLineChart(data){
      try{
        if(data !== null){
          let result = [];
          
          let DataChart = this.state.data;
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
          this.setState({dataChart:result
          });
        }
      }
      catch(err){
        this.getRuleData();
      }
        
      
    }
    writeTable(){
      if(this.state.data !== null){
      try {
        let result = [];
        let DataTable = this.state.data;
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
    let DataTable = this.writeTable();
		return (
      <div className="col-lg-4">
      <div className="Infomation">
      
      <HighchartsReact
      highcharts={Highcharts}
    options={{
          title: {
            text: 'Chart of incremental values of columns'
          },
          series: this.state.dataChart,
          credits: {
          enabled: false
        },
        xAxis: {
            categories: ['Min', '25%', '50%', '75%', 'Max']
        }
      }}
      />
      <div className="DetailInfo">
      Describe the data
      </div>


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
        </div>
        )
	}
};
export default Describe;