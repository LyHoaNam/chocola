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
			authorization: null
		}
	}

	componentDidMount(){
		let author=localStorage.getItem('Auth');
		this.setState({authorization:author});
		this.getData(author);
	}
	getData(bearer) {
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
	render(){
		return(
			<div id="content" className="row left15">
			<NumberOfClusters
			DataLineChart = {this.state.dataLineChart}/>
			<DefineClusters />
			<TableClustering />
			</div>
			)
	}
}
export default Clustering;