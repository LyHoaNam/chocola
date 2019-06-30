import React, {PureComponent} from "react";
import "./clustering.css";
import NumberOfClusters from "./NumberOfClusters";
import DefineClusters from "./DefineClusters";
import TableClustering from "./TableClustering";
class Clustering extends PureComponent {
constructor(props) {
		super(props);
		this.state ={
			dataLineChart: [],
			dataScatterPlot: [],
			authorization: null,
			k_cluster: 3
		}
		this.selectedvalue=this.selectedvalue.bind(this);
	}

	componentDidMount(){
		let author=localStorage.getItem('Auth');
		this.setState({authorization:author});
		this.getOptimumData(author);
		this.getDefineData(author,this.state.k_cluster);
	}
	getOptimumData(bearer) {
		let col1 = '?col1='+this.props.col1;
		let col2 = '&col2='+this.props.col2;
		let url= '/cluster/optimum'+col1+col2;
		let options = {
			method: 'GET',
			headers: {
				'Authorization': bearer
			}
		}
		fetch(url,options)
		.then(res=>res.json(  ))
		.then(res=>
		{
			if(res.line)
				this.setState({dataLineChart:res.line});
		}
		)
		.catch(e=>{
			console.log(e);
		});  
	}
	getDefineData(bearer,k) {
		let col1 = '?col1='+this.props.col1;
		let col2 = '&col2='+this.props.col2;
		let k_cluster = '&k='+k;
		let url= '/cluster/define'+col1+col2+k_cluster;
		let options = {
			method: 'GET',
			headers: {
				'Authorization': bearer
			}
		}
		fetch(url,options)
		.then(res=>res.json(  ))
		.then(res=>
		{
			if(res.ScatterPlot)
				this.setState({dataScatterPlot:res.ScatterPlot});
		}
		)
		.catch(e=>{
			console.log(e);
		});  
	}
	selectedvalue(value){
		if(value !== this.state.k_cluster){
			this.setState({k_cluster:value});
			this.getDefineData(this.state.authorization,value)}
	}
	render(){
		return(
			<div id="contentCluster" className="row">
			<NumberOfClusters
			DataLineChart = {this.state.dataLineChart}
			callbackValue={this.selectedvalue}/>
			<DefineClusters
			K_cluster = {this.state.k_cluster} 
			DataScatterPlot = {this.state.dataScatterPlot}
			/>
			<TableClustering 
			col1 = {this.props.col1}
			col2 = {this.props.col2}
			Baerer = {this.state.authorization}
			NumberTable = {this.state.k_cluster}/>
			</div>
			)
	}
}
export default Clustering;